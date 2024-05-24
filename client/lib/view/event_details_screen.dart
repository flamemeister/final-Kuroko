import 'package:flutter/material.dart';

import '../model/event.dart';



class EventDetailsPage extends StatelessWidget {
  final Event event;

  const EventDetailsPage({Key? key, required this.event}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(event.title),
        backgroundColor: const Color(0xFFffd166),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text('Description: ${event.description}', style: TextStyle(fontSize: 16)),
            SizedBox(height: 8),
            Text('Start Date: ${event.startDate}', style: TextStyle(fontSize: 16)),
            SizedBox(height: 8),
            Text('End Date: ${event.endDate}', style: TextStyle(fontSize: 16)),
          ],
        ),
      ),
    );
  }
}
