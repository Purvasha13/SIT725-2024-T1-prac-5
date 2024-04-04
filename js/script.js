const cardList = [
    {
      title: "Retriever",
      image: "image/dog-1.jpeg",
      link: "About Me",
      description: "I am a Golden retriever puppy !!"
    },
    {
      title: "Pug",
      image: "image/dog-2.jpeg",
      link: "About Me",
      description: "I am a Pug!!"
    },
    { 
     title: "German Shephard",
     image: "image/dog-3.jpeg",
     link: "About Me",
     description: "I am a german shephard"
    }
 ];

const clickMe = () => {
    $('#addCardForm').modal('open');
};

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
        '<div class="card small"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
        '</div><div class="card content">'+
        '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right"></i></span><p><a href="#">'+item.link+'</a></p></div>'+
        '<div class="card-reveal">'+
        '<span class="card-title activator grey-text text-darken-4">'+item.title+
        '<i class="material-icons right">close</i></span>'+
        '<p class="card-text">'+item.description+'</p>'+
        '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });
};

const submitForm = () => {
    let formData = {
        title: $('#title').val(),
        color: $('#color').val(),
        image: $('#image').val(),
        description: $('#description').val()
    };

    // Send form data to the server
    $.post('/api/cards', formData)
        .done(function (data) {
            console.log('Card added successfully:', data);
            // Close modal after successful submission
            $('#addCardForm').modal('close');
            // Clear form fields
            $('#title').val('');
            $('#color').val('');
            $('#image').val('');
            $('#description').val('');
            // Refresh the page to display the newly added card
            window.location.reload();
        })
        .fail(function (xhr, status, error) {
            console.error('Error adding card:', error);
        });
};

$(document).ready(function() {
    $('.materialboxed').materialbox();
    $('#clickMeButton').click(() => {
        clickMe();
    });
    $('#formSubmit').click(() => {
        submitForm();
    });
    addCards(cardList);
    $('.modal').modal();

    // Add event listener for form submission
    $('#addCardForm').submit(function(event) {
        event.preventDefault(); // Prevent default form submission
        submitForm();
    });
});
