$(document).ready(function (){
    
        let html=`<option value="0">Godina rođenja</option>`;
        for(let i=2023; i>=1900; i--){
            html += `<option value="${i}">${i}</option>`;
        }
        $("#ddlGodina").html(html);

        function validacija(data, regEx, poruka){
            greske=0;
    
            if(!regEx.test(data.val())){
                data.addClass('border-danger border-4');
                data.parent().find("p").html(poruka);
                greske++;
            }
            else{
                data.removeClass('border-danger');
                data.addClass('border-success border-4');
                data.parent().find("p").html("");
            }
    
            return greske;
        }

        function poruka(){
            var ime = $("#tbIme");
            var prezime = $("#tbPrezime");
            var pol = $("input[type='radio'][name='pol']:checked");
            var godina = $("#ddlGodina");
            var adresa = $("#tbAdresa");
            var grad = $("#tbGrad");
            var poruka = $("#tbPoruka");
            var potvrda = $('input[name="cbPotvrda"]:checked');
            // console.log(ime.val(), prezime.val(), pol.val(), godina.val(), adresa.val(), grad.val(), potvrda.val());
            
            greska=0;
            
            mssg =poruka.val().trim().split(" ");

            imeGreska = "Ime mora početi velikim slovom i imati najmanje 3 slova.";
            prezimeGreska = "Prezime mora početi velikim slovom i imati najmanje 4 slova.";
            adresaGreska = "Morate uneti adresu prebivališta.";
            gradGreska = "Morate uneti grad.";

            regIme = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,50}$/;
            regPrezime = /^[A-ZŠĐŽČĆ][a-zšđžčć]{3,50}$/;
            regAdresa = /^[0-9\\\/# ,A-Z]+[ ,]+[0-9\\\/#, a-zA-Z]{1,}/;
            regGrad = /^[A-ZŠĐŽČĆ]+(?:[\s-][a-zšđžčć]+)*$/;

            greska+=validacija(ime, regIme, imeGreska);
            greska+= validacija(prezime, regPrezime, prezimeGreska);
            greska+= validacija(adresa, regAdresa, adresaGreska);
            greska+= validacija(grad, regGrad, gradGreska);

            if(pol.val() == undefined){
                $(".pol").html("Morate izabrati pol.");
                greska++;
            }
            else{
                pol.removeClass('text-danger');
                pol.addClass('text-success');
                $(".pol").html("");
            }

            if(godina.val() == 0){
                godina.addClass('border border-danger border-4');
                godina.parent().find('p').html("Morate uneti godinu rođenja.");
                greska++;
            }
            else{
                godina.removeClass('border-danger');
                godina.addClass('border-success');
                godina.parent().find('p').html("");
            }

            if(poruka.val() == "" || mssg.length < 5){
                poruka.addClass('border-danger border-4');
                poruka.parent().find('p').html("Poruka mora sadržati najmanje 5 reči.");
                greska++;
            }
            else{
                poruka.removeClass('border-danger');
                poruka.addClass('border-success');
                poruka.parent().find('p').html("");
            }
            if(potvrda.val() == undefined){
                $('.potvrda').html("Molim vas potvrdite Vašu saglasnost.");
                greska++;
            }
            else{
                $(".potvrda").html("");
            }
            if(greska == 0){                
                podaci = {
                    ime : ime.val(),
                    prezime: prezime.val(),
                    pol: pol.val(),
                    godina: godina.val(),
                    adresa: adresa.val(),
                    grad: grad.val(),
                    poruka: poruka.val()
                }
                $.ajax({
                    url: "models/forma.php",
                    method : "post",
                    dataType : "json",
                    data : podaci,
                    success: function(result){
                        console.log(result.odgovor);
                        if(result.odgovor == "uspeh"){
                        $("#forma").html(`<div class="alert alert-success" role="alert">
                            <h4 class="alert-heading">Uspešno ste poslali poruku!</h4>
                            <p>Hvala Vam na vremenu koje ste izdvojili da me kontaktirate.U nastavku, možete videti podatke koje ste uneli:</p>
                            <hr>
                            <p class="mb-0"><span class="fw-bolder">Ime i prezime: </span>${ime.val()} ${prezime.val()}</p>
                            <p class="mb-0"><span class="fw-bolder">Pol: </span>${pol.val()}</p>
                            <p class="mb-0"><span class="fw-bolder">Godina rođenja: </span>${godina.val()}</p>
                            <p class="mb-0"><span class="fw-bolder">Adresa: </span>${adresa.val()}</p>
                            <p class="mb-0"><span class="fw-bolder">Grad: </span>${grad.val()}</p>
                            <p class="mb-0"><span class="fw-bolder">Sadržaj poruke: </span>${poruka.val()}</p>
                          </div>`);
                        }
                    }
                })
            }
        }
        $("#btnSend").click(poruka);
        $('.slider').slick({
            centerMode: true,
            centerPadding: '100px',
            slidesToShow: 2,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2500,
            responsive: [
              {
                breakpoint: 780,
                settings: {
                  centerPadding: '40px',
                  slidesToShow: 1
                }
              }
            ]
          });
              
})