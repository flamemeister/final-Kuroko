import 'package:basketball_kuroko_wiki/view/kuroko_drawer.dart';
import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';

import '../model/event.dart';
import '../services/api_service.dart';
import 'event_details_screen.dart';


class CalendarScreen extends StatefulWidget {
  const CalendarScreen({super.key});

  @override
  _CalendarScreenState createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  late Map<DateTime, List<Event>> _events;
  late List<Event> _selectedEvents;
  late CalendarFormat _calendarFormat;
  DateTime _selectedDay = DateTime.now();
  DateTime _focusedDay = DateTime.now();

  @override
  void initState() {
    super.initState();
    _selectedEvents = [];
    _events = {};
    _calendarFormat = CalendarFormat.month;
  }

  List<Event> _getEventsForDay(DateTime day) {
    return _events[day] ?? [];
  }

  void _onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    setState(() {
      _selectedDay = selectedDay;
      _focusedDay = focusedDay;
      _selectedEvents = _getEventsForDay(selectedDay);
    });
  }

  void _onFormatChanged(CalendarFormat format) {
    setState(() {
      _calendarFormat = format;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Events'),
      ),
      drawer: const KurokoDrawer(),
      body: Column(
        children: [
          TableCalendar(
            firstDay: DateTime.utc(2010, 10, 16),
            lastDay: DateTime.utc(2030, 3, 14),
            focusedDay: _focusedDay,
            calendarFormat: _calendarFormat,
            selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
            onDaySelected: _onDaySelected,
            onFormatChanged: _onFormatChanged, // Include this line
            eventLoader: _getEventsForDay,
            startingDayOfWeek: StartingDayOfWeek.monday,
            calendarStyle: const CalendarStyle(
              outsideDaysVisible: false,
            ),
          ),
          const SizedBox(height: 8.0),
          Expanded(
            child: ListView.builder(
              itemCount: _selectedEvents.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(_selectedEvents[index].toString()),
                  onTap: () => _showEditDeleteDialog(index),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () => addRandomEvent(),
      ),
    );
  }

  Future<void> addRandomEvent() async {
    try {
      List<Event> events = await fetchAllEvents();
      var index = _selectedDay.day % events.length; // Генерируем случайный индекс
      _events[_selectedDay]?.add(events[0]); // Добавляем событие в список для выбранного дня
      setState(() {
        _selectedEvents = _getEventsForDay(_selectedDay);
      });

      // Навигация к странице деталей события
      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => EventDetailsPage(event: Event (events[index].title, events[index].description, "${_selectedDay.day}.${_selectedDay.month}.${_selectedDay.year}", "${_selectedDay.day}.${_selectedDay.month}.${_selectedDay.year}")),
        ),
      );
    } catch (e) {
      print('Error adding event: $e'); // Логируем ошибку, если что-то пошло не так
    }
  }


  void _showEditDeleteDialog(int index) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Edit or Delete Event'),
        content: const Text('Would you like to edit or delete this event?'),
        actions: <Widget>[
          TextButton(
            child: const Text('Delete'),
            onPressed: () {
              _events[_selectedDay]!.removeAt(index);
              setState(() {
                _selectedEvents = _getEventsForDay(_selectedDay);
              });
              Navigator.of(context).pop();
            },
          ),
          TextButton(
            child: const Text('Edit'),
            onPressed: () {
              Navigator.of(context).pop();
              _showEditEventDialog(index);
            },
          ),
          TextButton(
            child: const Text('Cancel'),
            onPressed: () => Navigator.of(context).pop(),
          ),
        ],
      ),
    );
  }

  void _showEditEventDialog(int index) {
    TextEditingController textEditingController =
        TextEditingController(text: _selectedEvents[index].toString());
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Edit Event'),
        content: TextField(
          controller: textEditingController,
          autofocus: true,
        ),
        actions: <Widget>[
          TextButton(
            child: const Text('Save'),
            onPressed: () {
              setState(() {
                _events[_selectedDay]![index] = textEditingController.text as Event;
                _selectedEvents = _getEventsForDay(_selectedDay);
              });
              Navigator.of(context).pop();
            },
          ),
          TextButton(
            child: const Text('Cancel'),
            onPressed: () => Navigator.of(context).pop(),
          ),
        ],
      ),
    );
  }
}
