module SprottyClientApis

open System.Text
open System.Net.Http
open Newtonsoft.Json

//get request to sprotty
let getFromSprotty (url: string) =
    async {
        use client = new HttpClient()
        let! response = client.GetAsync(url) |> Async.AwaitTask
        response.EnsureSuccessStatusCode() |> ignore
        let! content = response.Content.ReadAsStringAsync() |> Async.AwaitTask
        return content
    }
//post request to sprotty
let graphDataToSmodel (url: string) (data: obj) =
    async {
        use client = new HttpClient()
        let json = JsonConvert.SerializeObject(data)
        let content = new StringContent(json, Encoding.UTF8, "application/json")
        let! response = client.PostAsync(url, content) |> Async.AwaitTask
        response.EnsureSuccessStatusCode() |> ignore
        let! responseContent = response.Content.ReadAsStringAsync() |> Async.AwaitTask
        return responseContent
    }

