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
              color: Colors.blue,
            ),
            child: Text(
              'Basketball Kuroko Wiki',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          ListTile(
            title: const Text('Main'),
            onTap: () {
              Navigator.pushReplacementNamed(context, '/');
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
          )
        ],
      ),
    );
  }
}
