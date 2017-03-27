// Waiting for HTML
$(document).ready(function() {
	var charts = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '';

	// Generate random id
	function randomString() {
		for (i = 0; i < 10; i++) {
			str += charts[Math.floor(Math.random() * charts.length)]; //Function draws 10 elements from string and composes them into one string
		}
		return str;
	}

	function initSortable() {
		// Choose all card list which can movin the card to antoher place.
		// jQuery UI .sortable(); can give us drag 'n' drop function
	    $('.column-card-list').sortable({
	    	// Configuration object from documentation.
		    connectWith: '.column-card-list', // Select he list in which the sort will work
		    placeholder: 'card-placeholder' // Holds the class name that apears when it hovers over an empty field to which we drop a item.
	    }).disableSelection(); // Turn off select text when drag'n'drop
 	}

 	$('.create-column')
	  	.click(function(){
		var name = prompt('Type column name');
		var column = new Column(name);
	    	board.addColumn(column);
	});

	// Board object
	var board = {
		name: 'Kanban Board',
		// Method that will create new column
		addColumn: function(column) {
			this.$element.append(column.$element);  //this.$element is board.$element
			// jQueryUI
			initSortable();
		},
		$element: $('#board .column-container')
	};

	// Contructor for new Card instance
	function Card(description) {
		var self = this;
		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			// 1. Create new elements for Card components
			// Three bricks consists of a card

			// List element - card
			var $card = $('<li>').addClass('card');
			// Card description in paragraph
			var $cardDescription = $('<p>').addClass('<card-description>').text(self.description);
			// Button for delete card
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');

			//2. Hooking up Events
			// Delete card
			$cardDelete.click(function() {
				self.removeCard();
			});
			//3. Construction of the card and return the instance
			$card.append($cardDelete)
				.append(cardDescription);
			return $card;
		}
	}

	// Card prototype with delete function
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	};

	// Contructor for new column instance
	function Column(name) {
		var self = this;   // for function inside function
		this.id = randomString();  // to assign id to random string
		this.name = name;
		this.$element = createColumn(); // With new instance there will be created new jquery object

		function createColumn() {

			// Creating Column components
			var $column = $('<div>').addClass('column'); // Add new class to div
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name); // Add name parameter by text method into h2 column title
			var $columnCardList = $('<ul>').addClass('column-list'); // To create lists of elements
			var $columnDelete = $('<button>').addClass('btn-delete').text('X');
			var $columnAddCard = $('<button>').addClass('add-card').text('Add card');

			// Delete column after pressing the button
			$columnDelete.click(function() {
				self.removeColumn();
			});
			// Add card after pressing the button
			$columnAddCard.click(function(event){
				self.addCard(new Card(prompt('Enter card title'))); //Prompt is for getting the title from user
			});

			// Constructing column element to connect altt parts.
			$column.append($columnTitle)
				.append($columnDelete)
				.append($columnAddCard)
				.append($columnCardList);

			// Returning created column
			return $column;  // without this we don't have a reference to new instance, where we cal function
		}
	}

	// Add two methods to Column prototype
	Column.prototype = {
		// Methods takes card as the parameter which we want to add into column
		addCard: function(card) {
			//We take all 'ul' children from column and add new card.
			this.$element.children('ul').append(card.$element); //card.$element because we construct the same way like column.
		},
		// This method will delete whole column
		removeColumn: function() {
			this.$element.remove();
		}
	};

	// Create columns
	var todoColumn = new Column('To do');
	var doingColumn = new Column('In progress');
	var doneColumn = new Column('Finished');

	// Add columns
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	// New cards
	var card1 = new Card('New quest');
	var card2 = new Card('Create Kanban Board');

	// add cards
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);
});
