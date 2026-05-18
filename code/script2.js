    const wrapper = document.querySelector(".slider-wrapper");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const slides = document.querySelectorAll(".slider-slide");
    
    if (wrapper && slides.length > 0) 
    {
        let activeIndex = 0;
    
        function updateSliderPosition() 
        {
            wrapper.style.transform = `translateX(-${activeIndex * 100}%)`;
        }
    
        nextBtn.addEventListener("click", () => 
        {
            activeIndex++;
            if (activeIndex >= slides.length) {
                activeIndex = 0;
            }
            updateSliderPosition();
        });
    
        prevBtn.addEventListener("click", () => 
        {
            activeIndex--;
            if (activeIndex < 0) {
                activeIndex = slides.length - 1;
            }
            updateSliderPosition();
        });
    }   