export async function GET(Request){
     
    const list = [
        {name:"n1",age:"a1"},
        {name:"n2",age:"a2"},
        {name:"n3",age:"a3"},
        {name:"n4",age:"a4"}
    ]

    return new Response(JSON.stringify(list))

}

