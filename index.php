<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Izdate knjige</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <link rel="stylesheet" href="main.css">
  <script>
      $( function() {
      //  $( "#datum" ).datepicker();
        $('#datum').datepicker({ dateFormat: 'd MM, y' }).val();
      } );
  </script>
</head>
<body class="bg-dark">

      <div class="container">
        <div class="row">
          <div class="col-8 mx-auto mt-5 test">
            <h1 class="display-4 text-warning">Iznajmljene knjige:</h1><hr><br>

            <form action="" method="post" class="text-warning">
              <div class="form-group">
                <label for="knjiga">Knjiga:</label>
                <input type="text" name="knjiga" id="knjiga" class="form-control form-control-lg">
              </div>
              <div class="form-group">
                <label for="autor">Autor:</label>
                <input type="text" name="autor" id="autor" class="form-control form-control-lg" >
              </div>
              <div class="form-group">
                <label for="datum">Datum vraćanja:</label>
                <input type="text" name="datum" id="datum" class="form-control form-control-lg">
              </div>
              <div class="buttons d-flex">

                <div class="form-group mr-auto">
                  <input type="submit" value="Snimi" id="snimi" class="btn btn-outline-success">
                </div>
                <div class="form-group mr-3">
                  <input type="submit" value="Promeni" id="promeni" class="btn btn-outline-warning">
                </div>
                <div class="form-group">
                  <input type="submit" value="Obriši" id="obrisi" class="btn btn-outline-danger">
                </div>

              </div>
            </form>


            <div class="prikaz mt-5">
              <table class="table table-bordered text-white text-center">
                <thead class="bg-success text-dark text-uppercase">
                  <tr>
                    <th>Knjiga</th>
                    <th>Autor</th>
                    <th>Datum vraćanja</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>


      <script src="main.js"></script>
</body>
</html>
