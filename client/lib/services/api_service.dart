import 'dart:convert'; // Добавьте эту строку для импорта библиотеки dart:convert

import 'package:http/http.dart' as http;

Future<String> registerUser(String email, String password) async {
  final response = await http.post(
    Uri.parse('https://final-kuroko-2.onrender.com/auth/register'),
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
    Uri.parse('https://final-kuroko-2.onrender.com/auth/login'),
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
