
// TODO: Replace Ruth Ho AND 23016246 with your name and RP student number
// Admin Number: Ruth Ho 23016246

// Class: LibraryBook
// TODO: Complete the class based on the instructions given

class LibraryBook {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        thisisAvailable = true;
    }

    borrowBook(borrowerName) {
        // TODO: Check availability and print appropriate message
        if (this.isAvailable)
         {
            thisisAvailable = false;
            console.log(`Book ${this.title} has been borrowed by ${borrowerName}.`);
            console.log("----------------------------------------------------");
         }
        else
        {
            console.log(`Book ${this.title} is currently unavailable.`);
            console.log("----------------------------------------------------");
        }
    }
        
    returnBook(){
        this.isAvailable = true;
        console.log(`Book $(this.title) has been returned.`);
    }
    
    getDetails() {
        console.log(`Title: ${this.title}`);
        console.log(`Author: ${this.author}`);
        console.log(`ISBN: ${this.ISBN}`);
        console.log(`Available: ${this.isAvailable ? "Yes" : "No"}`) ;
        console.log("----------------------------------------------------");               
    }
}

// 🔍 Example usage – do not remove
const book1 = new LibraryBook("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565");
const book2 = new LibraryBook("1984", "George Orwell", "9780451524935");

book1.getDetails();
book1.borrowBook("Alice");
book1.returnBook();

book2.getDetails();
book2.borrowBook("Bob");
book2.returnBook();



/*
🧠 Reflection:
1. Personally I feel like the formation of the class LibraryBook was relatively easy as it is the same format for all the properities.
Additionally getDetails was okay as it is just "printig" of the properties.
2. I feel like borrowBook(borrowerName) was confusing as the steps were quite tedious
 and having to remeber to set the isAvailable to false and its default was set to true.

*/
