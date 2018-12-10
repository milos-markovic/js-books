
const Storage = (function(){



    return {

        storeItem: function(item){

            let books = [];

            if(localStorage.getItem('book')){

                books = JSON.parse(localStorage.getItem('book'));
                books.push(item);

                localStorage.setItem('book',JSON.stringify(books));
            }else{
                  books.push(item);
                  localStorage.setItem('book', JSON.stringify(books));
            }
        },
        getItems: function(){

            let items;

            if(localStorage.getItem('book')){
              items = localStorage.getItem('book');

              items = JSON.parse(items);

            }else{
              items = [];
            }


            return items;

        },
        updateItem: function(updated_item){

          let storageItems = this.getItems();

          storageItems.forEach(function(item,index){
              if(item.id === updated_item.id){

                  storageItems.splice(index, 1, updated_item);
              }
          });
          localStorage.setItem('book', JSON.stringify(storageItems));
        },
        deleteFromStorage: function(id){

          let storageItems = this.getItems();

          storageItems.forEach(function(item,index){
              if(item.id === id){

                  storageItems.splice(index, 1);
              }
          });
          localStorage.setItem('book', JSON.stringify(storageItems));
        }

    }

})()


const BookCtrl = (function(){

  const Book = function(id, knjiga, autor, datum){
      this.id = id;
      this.knjiga = knjiga;
      this.autor = autor;
      this.datum = datum;
  }


  const data = {

      books: Storage.getItems(),
      curentBook: null,

  }

  return {
      storeInputs: function(knjiga, autor, datum){

          let id;

          if(data.books.length > 0){
              id = data.books[data.books.length - 1].id + 1;
          }else{
              id = 0;
          }

          const book = new Book(id, knjiga, autor, datum);

          data.books.push(book);

          return book;
      },
      setCurentItem: function(id){

          let found = null;

          data.books.forEach(function(item){

              if(item.id == id){

                  found = item;

              }
          });

          data.curentBook = found;

          return data.curentBook;
      },
      updateItem: function(input){

        let updated = null;

        data.books.forEach(function(item){

            if(item.id === data.curentBook.id){

              item.knjiga = input.knjiga;
              item.autor = input.autor;
              item.datum = input.datum;

              updated = item;
            }

        });
        return updated;
      },
      deleteBook: function(){

          let ids = [];

          data.books.forEach(function(item){
                ids.push(item.id);
          });
          let index = null;

          ids.forEach(function(id){

              if(id === data.curentBook.id){
                  index = id;
              }
          });

          data.books.slice(index, 1);

          return data.curentBook.id;
      },
      getBooks: function(){
        return data.books;
      }

  }

})();


const UICtrl = (function(){


  return {
      getInputs: function(){
        return {
            knjiga: document.querySelector("#knjiga").value,
            autor: document.querySelector("#autor").value,
            datum: document.querySelector("#datum").value,
        }
      },
      ShowItem: function(item){

          const tr = document.createElement('tr');

          tr.id = `item-${item.id}`;

          tr.innerHTML = `<td>${item.knjiga}</td><td>${item.autor}</td><td>${item.datum}</td><td><a class="pen" id="edit" href="#"><i class="fas fa-pencil-alt"></i></a></td>`;

          const tbody = document.querySelector('tbody');

          tbody.appendChild(tr);

      },
      showAllItems: function(items){
         let tr = '';

         items.forEach(function(item){

              tr += `<tr id='item-${item.id}'><td>${item.knjiga}</td><td>${item.autor}</td><td>${item.datum}</td><td><a class="pen" id="edit" href="#"><i class="fas fa-pencil-alt"></i></a></td></tr>`;
         });

         document.querySelector("tbody").innerHTML = tr;

      },
      hideButtons: function(){
          document.querySelector("#promeni").style.display = 'none';
          document.querySelector("#obrisi").style.display = 'none';
      },
      clearInputs: function(){
          document.querySelector("#knjiga").value = '';
          document.querySelector("#autor").value = '';
          document.querySelector("#datum").value = '';
      },
      showButtons: function(){
        document.querySelector("#promeni").style.display = 'inline';
        document.querySelector("#obrisi").style.display = 'inline';
      },
      showCurentItem: function(curent){

        document.querySelector("#knjiga").value = curent.knjiga;
        document.querySelector("#autor").value = curent.autor;
        document.querySelector("#datum").value = curent.datum;
      },
      showUpdatedItem: function(item){

          const trs = document.querySelectorAll('tr');

          trs_array = Array.from(trs);

          trs_array.forEach(function(element){

              if(element.id === `item-${item.id}`){

                  element.id = `item-${item.id}`;
                  element.innerHTML = `<td>${item.knjiga}</td><td>${item.autor}</td><td>${item.datum}</td><td><a class="pen" id="edit" href="#"><i class="fas fa-pencil-alt"></i></a></td>`;

              }

          });
      },
      deleteBook: function(id){

        console.log(id);

        const trs = document.querySelectorAll('tr');

        trs_array = Array.from(trs);

        trs_array.forEach(function(element){

            if(element.id === `item-${id}`){
                element.remove();
            }
        });
      },
      showMessage: function(message,className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;

        const p = document.createElement('p');
        p.textContent = message;

        div.appendChild(p);

        let container = document.querySelector('.test');
        let form = document.querySelector('form');

        container.insertBefore(div,form);

        setTimeout(function(){
           document.querySelector('div.alert').remove();
         }, 2000);
      }

  }

})();


const App = (function(BookCtrl, UICtrl, Storage){

  const loadEvents = function(){

     document.querySelector("#snimi").addEventListener('click',addBook);

     document.querySelector("table").addEventListener('click',editState);

     document.querySelector("#promeni").addEventListener('click',updateBook);

     document.querySelector("#obrisi").addEventListener('click',deleteBook);

  }
  const deleteBook = function(e){

    const deleted_id = BookCtrl.deleteBook();

    UICtrl.deleteBook(deleted_id);

    UICtrl.clearInputs();

    UICtrl.hideButtons();

    Storage.deleteFromStorage(deleted_id)

    e.preventDefault();
  }

  const updateBook = function(e){

      const input = UICtrl.getInputs();

      const updatedItem = BookCtrl.updateItem(input);

      Storage.updateItem(updatedItem);

      UICtrl.showUpdatedItem(updatedItem);

      UICtrl.clearInputs();

      UICtrl.hideButtons();


      e.preventDefault();
  }

  const editState = function(e){

    if(e.target.parentNode.id === 'edit'){

        UICtrl.showButtons();

        const id_string = e.target.parentNode.parentNode.parentNode.id;

        const id_Array = id_string.split('-');

        const id = parseInt(id_Array[1]);

        const curentItem = BookCtrl.setCurentItem(id);

        UICtrl.showCurentItem(curentItem);
    }

    e.preventDefault();
  }

  const addBook = function(e){

    const input = UICtrl.getInputs();

    if(input.knjiga !== '' && input.autor !== '' && input.test !== ''){

      const item = BookCtrl.storeInputs(input.knjiga, input.autor, input.datum);

      if(item){
        UICtrl.clearInputs();

        UICtrl.ShowItem(item);

        UICtrl.showMessage('Uspešno ste uneli nove vrednosti','alert-success');

        Storage.storeItem(item);
      }
    }else{
        UICtrl.showMessage('Molimo vas ispunite sva polja','alert-danger');
    }

    e.preventDefault();
  }

  return {
      init: function(){
         loadEvents();

        UICtrl.hideButtons();

        const allItems = Storage.getItems();

        if(allItems.length > 0){
          UICtrl.showAllItems(allItems);
        }

      }
  }

})(BookCtrl, UICtrl, Storage);

App.init();
