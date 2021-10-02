import 'package:flutter/material.dart';
import 'package:flutter_licenta/routes/routes.dart';
import 'package:provider/provider.dart';
import '../routes/drawerNavigation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../screens/nfcScreen.dart';
import '../notifiers/functionalityState.dart';
import '../design/colors.dart';

class Overview extends StatelessWidget {
  static const String routeName = '/overview';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: appBarColor,
          title: const Text('Flutter licenta 2021'),
          actions: <Widget>[
            IconButton(
                onPressed: () {
                  FirebaseAuth.instance.signOut();
                  Navigator.pushReplacementNamed(context, pageRoutes.login);
                },
                icon: Icon(Icons.exit_to_app_outlined, color: Colors.white))
          ],
        ),
        body:
            Column(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
          Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                FunctionalityCard(name: 'NFC', state: false),
                FunctionalityCard(name: 'GPS', state: false)
              ]),
          Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                FunctionalityCard(name: 'Bluetooth', state: false),
                FunctionalityCard(name: 'Gyroscope', state: false)
              ]),
          FunctionalityCard(name: 'Camera', state: false)
        ]),
        drawer: DrawerNavigation());
  }
}

class FunctionalityCard extends StatefulWidget {
  final String name;
  final bool state;
  const FunctionalityCard({Key? key, required this.name, required this.state})
      : super(key: key);
  @override
  _FunctionalityCardState createState() => _FunctionalityCardState();
}

class _FunctionalityCardState extends State<FunctionalityCard> {
  @override
  Widget build(BuildContext context) {
    return Card(
        child: Container(
            height: 150,
            width: 150,
            child: Align(
                alignment: Alignment.center,
                child: Text(widget.name,
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontWeight: FontWeight.bold)))),
        color:
            Provider.of<FuncState>(context).nfc ? enableButton : disableButton);
  }
}
