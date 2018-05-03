
function readTextFile()
{
    let bookList = [];
   fetch('MyFile.txt')
       .then((res) => res.text())
       .then((data) => {
           bookList = data.split("\n");
       })
       .catch((err)=>console.log(err));
    searchBook(bookList);

}


function searchBook(bookList) {
    let search = document.getElementById("bookInput").value;
    let calledBefore =false;
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){
            if(calledBefore)
                return;

            calledBefore=true;

            var obj = JSON.parse(this.responseText);

            var numOfItems = obj.items.length;
            console.log("Number of items="+numOfItems);
            for (var i = 0; i < numOfItems; i++) {
                var item = obj.items[i];
                document.getElementById("searchResults").innerText += "["+item.volumeInfo.title+" "+item.volumeInfo.pageCount+"]";
                console.log("Number of pages="+item.volumeInfo.pageCount);
            }

        }
        else{
            console.log("Not success Error" + this.status);
        }
    };

    const maxResults = 10;
    const key = "API_KEY";
    url = "https://www.googleapis.com/books/v1/volumes?q="+search+"&maxResults="+maxResults+"&key="+key;
    xhttp.open("GET", url, false);
    xhttp.send();

}

document.getElementById("searchButton").addEventListener("click",searchBook,false);
document.getElementById("readFile").addEventListener("click",readTextFile,false);
