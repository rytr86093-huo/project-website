const buttons = document.querySelectorAll(".add-to-cart");
const cart_items = document.querySelector(".cart-items");
let buttonsArray = JSON.parse(localStorage.getItem("cartItems")) || [];
let current = 0;
let currentPrice = 0;

if (buttons.length > 0)
    {
buttons.forEach(button => {
    button.addEventListener("click", ()=>
    {
        const buttontext = button.textContent;
        button.textContent = "Добавлено✓";
        button.classList.add("added");
        
        setTimeout(() =>
        {
            button.textContent = buttontext;
            button.classList.remove("added");
        }, 1500 );

        const productCard = button.closest(".product-card");

        const productName = productCard.querySelector("h3").textContent;

        let productPrice = productCard.querySelector(".price").textContent;
        const onlyNumbersString = productPrice.replace(/\s/g, '').replace(/[^\d]/g, '');
        productPrice = Number(onlyNumbersString);

        const productImg = productCard.querySelector(".product-image").src;

        const productData = { id: button.id, name: productName, price: productPrice, img: productImg };

        buttonsArray.push(productData);

        localStorage.setItem("cartItems", JSON.stringify(buttonsArray));
    });
});
}

if(buttonsArray.length == 0) {}
else
{   
    const emptyCart = document.querySelector(".empty-cart");
    emptyCart.style.display = "none";
    
        buttonsArray.forEach((button, index)=>
            {
                current++;
                currentPrice += Number(button.price);
                const productName = button.name;
                const productPrice = button.price;
                const productImg = button.img;


                const newCartElement = document.createElement("div");
                const newCartElementChildLeft = document.createElement("div");
                const newCartElementChildCenter = document.createElement("div");
                const newCartElementChildRight = document.createElement("div");

                const img = document.createElement("img");
                const imgBtn = document.createElement("img");

                imgBtn.setAttribute("src", "images/deleteICON.png");
                imgBtn.classList.add("newCartImageBtn");
                img.setAttribute("src", productImg);
                img.classList.add("newCartImage");

                const name = document.createElement("p");
                const price = document.createElement("p");
                name.textContent = productName;
                price.textContent = productPrice + " руб.";
                price.style.color = "#e91e63";

                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("newCartBtn");

                deleteBtn.appendChild(imgBtn);

                newCartElementChildLeft.appendChild(img);

                newCartElementChildCenter.appendChild(name);
                newCartElementChildCenter.appendChild(price);

                newCartElementChildRight.appendChild(deleteBtn);

                newCartElement.classList.add("newCart");
                newCartElementChildLeft.classList.add("newCartChild");
                newCartElementChildCenter.classList.add("newCartChild");
                newCartElementChildRight.classList.add("newCartChild");

                newCartElement.appendChild(newCartElementChildLeft);
                newCartElement.appendChild(newCartElementChildCenter);
                newCartElement.appendChild(newCartElementChildRight);

                const summaryRow1 = document.querySelector(".summary-row");
                const fullElementsPrice = summaryRow1.querySelectorAll("span");
                const lastChildSummary = fullElementsPrice[fullElementsPrice.length - 1];
                lastChildSummary.textContent = currentPrice + " руб.";

                const summaryRow2 = document.querySelector(".summary-row");
                const allElements = summaryRow2.querySelectorAll("span");
                const firstChildSummary = allElements[allElements.length - 2];
                firstChildSummary.textContent = "Товары" + " (" + current + ")";

                const summaryRow4 = document.querySelectorAll(".summary-row");
                const summaryRow4_1 = summaryRow4[1];
                const fullElementsDilivery = summaryRow4_1.querySelectorAll("span");
                const lastChildSummaryDilivery = fullElementsDilivery[fullElementsDilivery.length - 1];
                lastChildSummaryDilivery.textContent = (100*current) + " руб.";

                const summaryRow3 = document.querySelector(".summary-row.total");
                const fullPriceSpan = summaryRow3.querySelectorAll("span");
                const fullPrice = fullPriceSpan[fullPriceSpan.length - 1];
                fullPrice.textContent = (100 * current + currentPrice) + " руб.";

                deleteBtn.addEventListener("click", ()=>
                {
                   let currentArray = JSON.parse(localStorage.getItem("cartItems")) || [];
                   const realIndex = currentArray.findIndex(item => 
                    item.name === button.name && 
                    item.price === button.price && 
                    item.img === button.img
                );
                if (realIndex !== -1)
                {
                    currentArray.splice(realIndex, 1);
                }
             
                   buttonsArray = currentArray;
                   localStorage.setItem("cartItems", JSON.stringify(currentArray));

                   current--;
                   firstChildSummary.textContent = "Товары" + " (" + current + ")";
                   lastChildSummaryDilivery.textContent = (100*current) + " руб.";
                   currentPrice = currentPrice - Number(button.price);
                   lastChildSummary.textContent = currentPrice + " руб.";
                   fullPrice.textContent = (100 * current + currentPrice) + " руб.";

                   newCartElement.remove();

                   if(buttonsArray.length == 0) // || currentArray.length < 1
                   {  emptyCart.style.display = "block"; }
                });

                if (cart_items)
                    { cart_items.appendChild(newCartElement); }
            })
    }
