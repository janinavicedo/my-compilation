function scrollToSection(sectionId) {
      document.getElementById(sectionId).scrollIntoView({behavior: 'smooth'});
    }

    function scrollToCalculateTotal() {
      document.getElementById('order-summary').scrollIntoView({ behavior: 'smooth' });
    }

    function calculateTotal() {
      const dishes = document.querySelectorAll('input[type="checkbox"]');
      let total = 0;
      let selectedItemsHTML = ''; 
      dishes.forEach((dish) => {
        if (dish.checked) {
          const name = dish.getAttribute('name'); // Use alt attribute as the name
          const price = parseFloat(dish.nextElementSibling.innerText.split('Php. ')[1]);
          const quantity = parseInt(dish.nextElementSibling.nextElementSibling.value);
          total += price * quantity;
          selectedItemsHTML += `<p>x ${quantity} ${name} - Php. ${(price * quantity).toFixed(2)}</p>`;
        }
      });

      const discount = document.querySelector('input[name="discount"]:checked').value;
      const discountedTotal = total - (total * discount);
      document.getElementById('totalAmount').innerText = discountedTotal.toFixed(2);
      document.getElementById('selectedItems').innerHTML = selectedItemsHTML; 
      scrollToCheckout(); 
    }

    function scrollToCheckout() {
      document.getElementById('order-summary').scrollIntoView({ behavior: 'smooth' });
    }
	

	
