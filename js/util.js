$(document).ready(function () {
  var value1 = -1;
  $("#nbp").click(function () {
    $("#chaises").empty();
    var value = $('#nbp').find(":selected").val();
    var image = "<img src='images/chaise.jpg'/>";

    for (var i = 0; i < value; i++) {
      $("#chaises").append(image);
    }
    value1 = value;

  });

  var d;
  $('#date').Zebra_DatePicker({
    format: 'd/m/Y', onSelect: function () {
      var dt = $(this).context.value;
      d = dt;
    }
  });



  $("#b1").click(function () {
    /*console.log(5);*/
    debugger;
    if (value1 === -1) {
      alert('saisir nombre des places')
    } else {
      var h;
      if ($('input[name="civilite"]').is(':checked')) {
        var x = $("input[name=civilite]:checked").each(
          function () {
            var v = $(this).val();
            if (v === "mme") {
              v = "Madamme";
            } else if (v === "mlle") {
              v = "Mademoiselle";
            } else if (v === "m") {
              v = "Monsieur";
            }
            h = v;
          });


        var nom = $('#nom').val();
        var n = nom.length;
        if (n < 10 || isNaN(nom) === false) {
          alert('nom et prenom tres court!!!!');

        } else {

          var validetel = /\d{8}$/;
          var tel = $('#tel').val();
          var date = $('#start').val();
          var heur = $('#appt').val();
          if (validetel.test(tel) === false) {
            alert('numéro de tel invalide !!!!');
          } else {
            var e = document.getElementById("nbp");
            var d = e.options[e.selectedIndex].text;
            $("#div_resume").empty();
            $('#btnPrint').removeClass("hidden");
            var large = '<div> <h1 class="titre-center"><img src="images/logotick.png"></h1> <div class="date_heur">' + date + '<br>' + heur + '</div><hr color="black"> ' + h + ' :<strong> ' + nom + '</strong> </br> Votre commande du ' + d + ' a ete bien validée les plats commandés sont:</div></br>';
            $("#div_resume").append(large);
            var prix = 0;
            var px = 0;
            var man;
            $('#ticket-bottom').removeClass("hidden");
            var x = $("input[name=cmd]:checked").each(
              function () {
                var p = $(this).data('prix');
                prix = prix + parseFloat(p);
                px = prix;
                var dt = $(this).context.value;
                man = dt;
                var large1 = '<ul> <li>' + man + '------------------' + p + 'dt</li> </ul>';

                $("#div_resume").append(large1);

              });
            if (px != 0) {
              var large2 = 'le montant total de la commande est de ' + px + ' dt';
              $("#div_resume").append(large2);
            }




          }
        }
      } else alert('la civilite est obligatoire');
    }

  });


  $("#btnPrint").click("click", function () {
    var divContents = $("#div_resume").html();
    var printWindow = window.open('', '', 'height=400,width=800');
    // printWindow.document.write('<html><head><title>Food Firas</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  });
});