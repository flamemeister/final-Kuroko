import 'dart:convert'; // Добавьте эту строку для импорта библиотеки dart:convert

import 'package:http/http.dart' as http;

import '../model/authors.dart';
import '../model/character.dart';
import '../model/event.dart';

Future<String> registerUser(String email, String password) async {
  final response = await http.post(
    Uri.parse('https://final-kuroko.onrender.com/auth/register'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'email': email,
      'password': password,
    }),
  );

  if (response.statusCode == 201) {
    return response.body;
  } else {
    throw Exception('Failed to register user');
  }
}

Future<String> loginUser(String email, String password) async {
  final response = await http.post(
    Uri.parse('https://final-kuroko.onrender.com/auth/login'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, String>{
      'email': email,
      'password': password,
    }),
  );

  if (response.statusCode == 200) {
    return response.body;
  } else {
    throw Exception('Failed to login');
  }
}

Future<List<Authors>> fetchAuthors() async {
  final response = await http.get(
    Uri.parse('https://final-kuroko-2.onrender.com/authors/'),
  );

  if (response.statusCode == 200) {
    final List<dynamic> data = jsonDecode(response.body);
    List<Authors> authorsList = [];

    for (var authorData in data) {
      Authors author = Authors(
        authorData['name'],
        authorData['age'],
        authorData['role'],
        authorData['description'],
      );
      authorsList.add(author);
    }

    return authorsList;
  } else {
    throw Exception('Failed to fetch authors');
  }
}

Future<List<Character>> fetchCharacters() async {
  final response = await http.get(
    Uri.parse('https://final-kuroko-2.onrender.com/characters'),
  );

  if (response.statusCode == 200) {
    final List<dynamic> data = jsonDecode(response.body);
    List<Character> charactersList = [];

    data.forEach((characterData) {
      Character character = Character(
        characterData['name'],
        characterData['age'],
        characterData['description'],
        characterData['imageUrl'],
        characterData['skill'],
      );
      charactersList.add(character);
    });

    return charactersList;
  } else {
    throw Exception('Failed to fetch characters');
  }
}

Future<Event> fetchEvent() async {
  final response = await http.get(
    Uri.parse('https://final-kuroko-2.onrender.com/events/random/get'),
  );

  if (response.statusCode == 200) {
    final data = jsonDecode(response.body);
    return Event(
      data['title'],
      data['description'],
      data['startDate'],
      data['endDate'],
    );
  } else {
    throw Exception('Failed to fetch event');
  }
}

Future<List<Event>> fetchAllEvents() async {
  final response = await http.get(
    Uri.parse('https://final-kuroko-2.onrender.com/events'),
  );

  if (response.statusCode == 200) {
    final List<dynamic> data = jsonDecode(response.body);
    List<Event> charactersList = [];

    data.forEach((eventData) {
      Event event = Event(
        eventData['title'],
        eventData['description'],
        eventData['startDate'],
        eventData['endDate'],
      );
      charactersList.add(event);
    });

    return charactersList;
  } else {
    throw Exception('Failed to fetch characters');
  }
}
