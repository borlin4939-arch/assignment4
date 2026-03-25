let items= [
    {
        name: "Asian",
        pic: "asian",
        price: 1500,
    },
    {
        name: "EUROPE",
        pic: "europe",
        price: 2500,
    },
    {
        name: "Southamerica",
        pic: "southamerican",
        price: 3500,
    },
    {
        name: "Northamerica",
        pic: "northamerican",
        price: 4500,
    }, 
]

function displayproduct() 
{
    let productlist = document.getElementById("indexproduct");
    let htmltag = "";
    items.forEach((item, i) => {
        htmltag="<div class='col-lg-3'><div class='card'><div class='card-header'><img class='img-item' src='images/"+item.pic+".jpg' alt=''> </div> <div class='card-body'> <h4 class='card-title'>Brand: "+item.name+
        "</h4> <h4 class=card-text>Price = "+item.price+"</h4> <a href='#' class='btn btn-primary add-to-cart'>Add to Cart</a></div></div></div>";
        
        productlist.innerHTML+=htmltag; // to add the html tag
    });
    //let counuter=0;
    addtocartbtn= document.querySelectorAll(".add-to-cart");
    for(let x=0; x<addtocartbtn.length; x++)
    {
        addtocartbtn[x].addEventListener('click', () => {
            //console.log(counter++);
            additem(x);
        })
    }
}

let itemincart=[]; // will store item user buy item
function additem(i)
{
    let total=0;
    let itemindex= localStorage.getItem('cartnumber'); // find in localstorage, have or not storage call cartnumber
    itemindex= parseInt(itemindex); // covert string to integar
    if(itemindex)
    {
        itemincart= localStorage.getItem('lsitemincart');
        itemincart= JSON.parse(itemincart);
        itemincart.push(items[i]); // add element into the array
        for(x=0; x<itemincart.length; x++)
        {
            total= itemincart[x].price +total;
        }
        itemindex++;
        localStorage.setItem('totalprice', total);
        localStorage.setItem('lsitemincart', JSON.stringify(itemincart)); // convert object to string
        localStorage.setItem('cartnumber', itemindex);
        cartdisplay(); // function card display
    }
    else // if trolly is empty
    {
        itemincart[0]= items[i];
        total= total+itemincart[0].price;
        localStorage.setItem('totalprice', total);
        localStorage.setItem('lsitemincart', JSON.stringify(itemincart)); // change object to string
        localStorage.setItem('cartnumber', 1); // create localStorage key called cartnumber
        cartdisplay(); // function card display
    }
}

function cartdisplay()
{
    let cartno= localStorage.getItem('cartnumber');
    cartno= parseInt(cartno);
    if(cartno) // if have localStorage called cartno
    {
        document.getElementById('cartdisplay').innerHTML= cartno; 
    }
    else // if dont have localStorage called cartno
    {
        document.getElementById('cartdisplay').innerHTML= 0;
    }
}
// to maintain the cartno value when we refresh the browser
window.addEventListener('load', () =>{
    cartdisplay();
});

function cartpagedisplay()
{
    let cartitems= localStorage.getItem('lsitemincart');
    cartitems= JSON.parse(cartitems); // convert string to object
    let productcontainer= document.querySelector('.product-container');
    if(cartitems && productcontainer)
    {
       productcontainer.innerHTML="";
        let htm="";
        cartitems.forEach((item, i) => {
            htm="<div class='col-3'><img class='img-cart' src='images/"+item.pic+".jpg'></div><div class='col-3'><p>"+item.name+
            "</p></div><div class='col-3'>"+item.price+"</div><div class='col-3'><label><Delete</label><input class='rdb' type='checkbox' name=></div><br<hr>";
            productcontainer.innerHTML+=htm;
        });
    }
    let total= localStorage.getItem('totalprice');
    total= parseFloat(total).toFixed(2); // convert string to float and 2 decimal;
    document.getElementById('totalprice').innerHTML= total;
}
