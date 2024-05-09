import 'dart:convert'; // Добавьте эту строку для импорта библиотеки dart:convert
import 'package:flutter/material.dart';
import '../services/api_service.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  Future<void> register() async {
    try {
      String email = emailController.text.trim();
      String password = passwordController.text.trim();
      await registerUser(email, password);
      // Если регистрация прошла успешно, перенаправляем пользователя на главный экран
      Navigator.pushReplacementNamed(context, '/home');
      print('User registered successfully');
    } catch (e) {
      // Если произошла ошибка при регистрации, вы можете обработать ее здесь
      print('Failed to register user: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Registration'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: emailController,
              decoration: InputDecoration(labelText: 'Email'),
            ),
            SizedBox(height: 20),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: InputDecoration(labelText: 'Password'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                register();
              },
              child: Text('Register'),
            ),
          ],
        ),
      ),
    );
  }
}
