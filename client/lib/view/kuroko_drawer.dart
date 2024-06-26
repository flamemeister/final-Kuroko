import 'package:flutter/material.dart';

class KurokoDrawer extends StatelessWidget {
  const KurokoDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          const DrawerHeader(
            decoration: BoxDecoration(
              color: const Color(0xFFe68c3a),
            ),
            child: Image(image: AssetImage("assets/logo/Site-logo.webp"))
          ),
          ListTile(
            title: const Text('Main'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/home');
            },
          ),
          ListTile(
            title: const Text("Kuroko characters"),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/listOfCharacters');
            },
          ),
          ListTile(
            title: const Text('Authors'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/listOfAuthors');
            },
          ),
          ListTile(
            title: const Text('News'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/listOfNews');
            },
          ),
          ListTile(
            title: const Text('Events'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/listOfEvents');
            },
          )
        ],
      ),
    );
  }
}
