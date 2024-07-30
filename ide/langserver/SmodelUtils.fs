module SmodelUtils

open System.Collections.Generic
open Newtonsoft.Json
open Blech.Frontend
open Blech.Intermediate
open Blech.Frontend.CommonTypes


type SNode<'NodeData> = {
    ``type``: string
    id: int
    label: string
    payload: 'NodeData
    outgoing: HashSet<int>
    incoming: HashSet<int>
}
type SEdge = {
    ``type``: string
    id: string
    sourceId: string
    targetId: string
}

type SModelRoot = {
    ``type``: string
    id: string
    children: obj[]
}

// let convertBlockGraphToSModel (graph: Graph) =
//     let nodes = 
//         blockGraphContext
//         |> Seq.map (fun kvp ->
//             let id = kvp.Key.ToString()
//             let block = kvp.Value
//             // Here you can determine the position and label of the node
//             { ``type`` = "node"; id = id; x = 0.0; y = 0.0; label = id }
//         )
//         |> Seq.toArray
//     nodes

//     let edges =
//         blockGraphContext
//         |> Seq.collect (fun kvp ->
//             let sourceId = kvp.Key.ToString()
//             let block = kvp.Value
//             block.Connections
//             |> Seq.map (fun targetId ->
//                 { ``type`` = "edge"; id = sprintf "%s_to_%s" sourceId targetId; sourceId = sourceId; targetId = targetId.ToString() }
//             )
//         )
//     |> Seq.toArray
//     edges
// let convertProgramGraphToSModel (graph: Graph) =
//     let nodes =
//         Graph.Nodes
//         |> Seq.map (fun node ->
//             { ``type`` = "node"
//               id = node.ID.ToString()
//               x = 0.0 // Replace with actual x-coordinate
//               y = 0.0 // Replace with actual y-coordinate
//               label = node.ID.ToString() }
//         )
//         |> Seq.toArray
//     nodes
//     let edges =
//         programGraph.Graph.Edges
//         |> Seq.map (fun edge ->
//             { ``type`` = "edge"
//               id = sprintf "%s_to_%s" (edge.Source.ID.ToString()) (edge.Target.ID.ToString())
//               sourceId = edge.Source.ID.ToString()
//               targetId = edge.Target.ID.ToString() }
//         )
//         |> Seq.toArray

//     let children = Array.concat [| nodes; edges |]
//     { ``type`` = "graph"
//       id = "root"
//       children = children }
//     let children = Array.concat [| nodes; edges |]
//     let root = { ``type`` = "graph"; id = "root"; children = children }
//     JsonConvert.SerializeObject(root, Formatting.Indented)

// // Example usage
// let blockGraphContext = new Dictionary<QName, BlockGraph>()
// // Populate your blockGraphContext with data here

// let smodelJson = convertBlockGraphToSModel blockGraphContext
// printfn "%s" smodelJson
