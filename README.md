# Blech Compiler setup: In root directory:

```
cd blech
dotnet build
dotnet publish -c Release -r osx-arm64 --self-contained
```
For Linux use linux-x64 or linux-arm64, for MacOS use osx-x64 for Intel or osx-arm64 for Apple silicon.


# Blech Language server setup: Follow ReadME file inside  ide directory

https://github.com/Chandrima-Barua/Blech-Vscode-extension/tree/main/ide

# Sprotty setup: Follow ReadME file inside sprotty directory:

https://github.com/Chandrima-Barua/Blech-Vscode-extension/tree/main/sprotty