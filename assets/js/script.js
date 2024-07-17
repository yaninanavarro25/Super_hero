$(document).ready(function () {
    $("form").submit((event) => {
      event.preventDefault();
  
      let superId = $("#idlistener").val();
      if (superId <= 0 || superId > 732 || isNaN(superId)) {
        alert("ingrese un identificador numerico valido");
      } else {
        getHero(superId);
      }
    });
  
    let getHero = (superId) => {
      $.ajax({
        type: "GET",
        url: "https://www.superheroapi.com/api.php/4905856019427443/" + superId,
        dataType: "json",
        success: function (data) {
          fillCard(data);
          console.log(data);
        },
      });
    };
  
    let fillCard = (data) => {
      $('#appear').attr("style", "display: none")
      $("#photo").attr("src", data.image.url);
      $("#name").text(`Nombre: ${data.name}.`);
      $("#conections").text(
        `Afiliados Conocidos: ${data.connections["group-affiliation"]} / ${data.connections.relatives}.`
        );
      $("#ocupation").text(`Ocupacion : ${data.work.occupation}.`);
      $("#appearance").text(`Avistamientos : ${data.first - appearance}.`);
      $("#sizes").text(
          `Apariencia: género ${data.appearance.gender} - raza ${data.appearance.race} - altura ${data.appearance.height[1]}.`
          );
      $("#weight").text(`Peso: ${data.appearance.weight[1]}. `);
      $("#partners").text(`Aliases: ${data.biography.aliases}.`);
      $('#dissapear').removeAttr('style');
      graphic(data.name, data.powerstats);
    };
    
    
    CanvasJS.addColorSet("customColorSet1", ['#2A99A0','#F1BE27','#B61E09','#E5701E','#E5C1A9','#D995BC','#4DA6A6']);
  
    let graphic = (nombre, data) => {
      let chart = new CanvasJS.Chart("chartContainer", {
        colorset : "customColorSet1",
        backgroundColor: null,
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: `Resumen Capacidades Metahumanas de ${nombre}`,
          fontFamily: "Bangers",
        },
        legend: {
          fontFamily: "Bangers"
        },
        toolTip:{
          fontFamily: "Bangers"
        },
        data: [
          {
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 13,
            indexLabel: "{label} - {y}%",
            dataPoints: [
              { y: data.combat, label: "combat" },
              { y: data.durability, label: "durability" },
              { y: data.intelligence, label: "intelligence" },
              { y: data.power, label: "power" },
              { y: data.speed, label: "speed" },
              { y: data.strength, label: "strength" },
            ],
          },
        ],
      });
      chart.render();
    };
  });