$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }

      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function(data, status, xhr) {

          // Success message
          if (data.indexOf('OK') != -1) {
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
            $('#success > .alert-success')
              .append("<strong>Votre message a été envoyé. </strong>");
            $('#success > .alert-success')
              .append('</div>');
            //clear all fields
            $('#contactForm').trigger("reset");

          } else {
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
            $('#success > .alert-danger').append("<strong>Erreur technique lors de l'envoi de votre message, merci de re-essayer plus tart ou contactez nous directement contact@nks-flowers.fr</strong>");
            $('#success > .alert-danger').append('</div>');

          }
        },
        error: function(xhr, status, error) {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append("<strong>Erreur lors de l'envoi de votre message, merci de re-essayer plus tart ou contactez nous directement contact@nks-flowers.fr</strong>");
          $('#success > .alert-danger').append('</div>');

        },
      })
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("#contactFormNews input").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      var email = $("input#email").val();
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
          subscribe: 'true',
          email: email
        },
        cache: false,
        success: function(data, status, xhr) {

          // Success message
          if (data.indexOf('OK') != -1) {
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
            $('#success > .alert-success')
              .append("<strong>Nous vous recontacterons très bientôt. </strong>");
            $('#success > .alert-success')
              .append('</div>');
            //clear all fields
            $('#contactFormNews').trigger("reset");

          } else {
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
            $('#success > .alert-danger').append("<strong>Erreur technique lors de l'envoi de votre message, merci de re-essayer plus tart ou contactez nous directement contact@nks-flowers.fr</strong>");
            $('#success > .alert-danger').append('</div>');

          }
        },
        error: function(xhr, status, error) {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append("<strong>Erreur lors de l'envoi de votre message, merci de re-essayer plus tart ou contactez nous directement contact@nks-flowers.fr</strong>");
          $('#success > .alert-danger').append('</div>');

        },
      })
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});