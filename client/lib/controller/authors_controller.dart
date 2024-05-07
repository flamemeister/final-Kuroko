import 'package:basketball_kuroko_wiki/model/authors.dart';

class AuthorController {
  List<Authors> getAuthorList() {
    return [
      Authors(
          'Abzal Nurym', 20, 'The Greatest Flutter developer', 'He is good'),
      Authors('Dilnaz', 19, 'Best project manager', "She is good"),
      Authors('Alibek Kamiluly', 19, 'I dont know', 'He is not so good'),
      Authors('Saken Aldiyar', 19, 'Random guy', 'He is default.'),
    ];
  }
}
