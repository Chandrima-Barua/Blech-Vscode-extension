import * as path from 'path';
import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient';
// import { getSprottyHtml } from '../../sprotty/src/index.ts';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext) {
    let serverDll = context.asAbsolutePath(binName());

    // Define server options for language client
    let serverOptions: ServerOptions = {
        run: { command: serverDll, args: [], transport: TransportKind.stdio },
        debug: { command: serverDll, args: [], transport: TransportKind.stdio }
    };

    // Define options for language client
    let clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'blech' }],
        synchronize: {
            configurationSection: 'blech',
            fileEvents: [] // No file events for now
        }
    };

    // Create and start the language client
    client = new LanguageClient('blech', 'Blech Language Server', serverOptions, clientOptions);
    client.start();

    // Register command handler for custom command
    let executeCustomCommandDisposable = vscode.commands.registerCommand('myExtension.generateGraph', () => {
        executeCustomCommand();
    });
    context.subscriptions.push(executeCustomCommandDisposable)

}

function executeCustomCommand() {
    if (client) {
        console.log('Generating graph...');

        // Get the current text editor 
        const activeTextEditor = vscode.window.activeTextEditor;

        // Check if a text editor is open
        if (!activeTextEditor) {
            vscode.window.showInformationMessage('No active text editor found.');
            return;
        }
        // Get the document URI from the active text editor
        const documentUri = activeTextEditor.document.uri;
        let executeCommandParams = {
            textDocument: { uri: documentUri.toString() }
        };
        client.sendRequest('textDocument/showGraph', executeCommandParams).then((response) => {
            const responseString = JSON.stringify(response);
            vscode.window.showInformationMessage(responseString);

            // Create and show the Sprotty graph webview
            const panel = vscode.window.createWebviewPanel(
                'generateGraph',
                'Generate Graph',
                vscode.ViewColumn.One,
                { enableScripts: true }
            );

            panel.webview.html = getSprottyHtml(response);
        
        }, (error) => {
            // Handle errors if any
            vscode.window.showErrorMessage('Failed to execute custom command: ' + error.message);
        });
    } else {
        vscode.window.showErrorMessage('Language client not initialized.');
    }
}

function getSprottyHtml(graphData: any) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sprotty Graph</title>
        <style>
            html, body, #sprotty {
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
        </style>
        <script src="https://unpkg.com/sprotty"></script>
    </head>
    <body>
        <div id="sprotty"></div>
        <script>
            const graph = ${JSON.stringify(graphData)};
            const container = document.getElementById('sprotty');
            const sprotty = require('sprotty');
            const modelSource = new sprotty.LocalModelSource();
            modelSource.setModel(graph);
            sprotty.createViewer({ baseDiv: container, modelSource });
        </script>
    </body>
    </html>`;
}

module.exports = { getSprottyHtml };

function binName() {
    // Determine platform-specific language server binary path
    if (process.platform === 'win32')
        return path.join('bin', 'BlechLanguageServer.exe');
    else if (process.platform === 'linux')
        return path.join('bin', 'BlechLanguageServer');
    else if (process.platform === 'darwin')
        return path.join('bin', 'BlechLanguageServer');
    else {
        console.error("Your operating system has been identified as "
            + process.platform
            + ". However, this plugin currently only supports win32, linux, and darwin.");
        return "";
    }
}

export function deactivate(): Thenable<void> | undefined {
    // Stop the language client when deactivating the extension
    if (!client) {
        return undefined;
    }
    return client.stop();
}
