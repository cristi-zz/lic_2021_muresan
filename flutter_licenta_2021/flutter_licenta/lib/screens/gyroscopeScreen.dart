import 'dart:async';

import 'package:flutter/material.dart';
import '../routes/drawerNavigation.dart';
import 'package:flutter_licenta/routes/routes.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:sensors_plus/sensors_plus.dart';
import '../design/colors.dart';

class GyroscopeScreen extends StatelessWidget {
  static const String routeName = '/gyroscope';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: appBarColor,
          title: Text('Sensors'),
          actions: <Widget>[
            IconButton(
                onPressed: () {
                  FirebaseAuth.instance.signOut();
                  Navigator.pushReplacementNamed(context, pageRoutes.login);
                },
                icon: Icon(Icons.exit_to_app_outlined, color: Colors.white))
          ],
        ),
        body: EnableSensors(),
        drawer: DrawerNavigation());
  }
}

class EnableSensors extends StatefulWidget {
  const EnableSensors({Key? key}) : super(key: key);

  @override
  _EnableSensorsState createState() => _EnableSensorsState();
}

class _EnableSensorsState extends State<EnableSensors> {
  bool isEnabled = false;
  String title = 'Enable';
  var gyroX = 0.0, gyroY = 0.0, gyroZ = 0.0;
  var accX = 0.0, accY = 0.0, accZ = 0.0;
  final subscription = <StreamSubscription<dynamic>>[];

  @override
  void dispose() {
    // TODO: implement dispose
    super.dispose();
    subscription.forEach((element) {
      element.cancel();
    });
  }

  void buttonHandler() {
    if (isEnabled == false) {
      setState(() {
        title = 'Disable';
        isEnabled = true;
      });
      subscription.add(accelerometerEvents.listen((AccelerometerEvent event) {
        setState(() {
          accX = double.parse(event.x.toStringAsFixed(3));
          accY = double.parse(event.y.toStringAsFixed(3));
          accZ = double.parse(event.z.toStringAsFixed(3));
        });
      }));

      subscription.add(gyroscopeEvents.listen((GyroscopeEvent event) {
        setState(() {
          gyroX = double.parse(event.x.toStringAsFixed(3));
          gyroY = double.parse(event.y.toStringAsFixed(3));
          gyroZ = double.parse(event.z.toStringAsFixed(3));
        });
      }));
    } else {
      setState(() {
        title = 'Enable';
        isEnabled = false;
      });
      subscription.forEach((element) {
        element.cancel();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.start, children: [
      Padding(
          padding: const EdgeInsets.all(20),
          child: ElevatedButton(
              child: Text(title),
              onPressed: () => buttonHandler(),
              style: ElevatedButton.styleFrom(
                  primary: isEnabled ? disableButton : enableButton,
                  fixedSize: Size(200, 50)))),
      Card(
          child: Column(children: [
        Container(
            // height: 180,
            margin: EdgeInsets.only(top: 50),
            width: double.infinity,
            padding: EdgeInsets.all(20),
            child: Align(
                child: Text('Accelerometer',
                    style: TextStyle(
                        fontWeight: FontWeight.bold, color: Colors.white))),
            color: primaryColor),
        Row(children: [
          Expanded(
              flex: 1,
              child: Container(
                  child: Column(
                    children: [
                      Text('X', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text(accX.toString(),
                          style: TextStyle(color: Colors.white))
                    ],
                  ),
                  color: secondaryColor,
                  padding: EdgeInsets.all(10))),
          Expanded(
              flex: 1,
              child: Container(
                  child: Column(
                    children: [
                      Text('Y', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text(accY.toString(),
                          style: TextStyle(color: Colors.white))
                    ],
                  ),
                  color: secondaryColor.withOpacity(0.8),
                  padding: EdgeInsets.all(10))),
          Expanded(
              flex: 1,
              child: Container(
                  child: Column(
                    children: [
                      Text('Z', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text(accZ.toString(),
                          style: TextStyle(color: Colors.white))
                    ],
                  ),
                  color: secondaryColor,
                  padding: EdgeInsets.all(10)))
        ])
      ])),
      Card(
          child: Column(children: [
        Container(
            // height: 180,
            margin: EdgeInsets.only(top: 50),
            width: double.infinity,
            padding: EdgeInsets.all(20),
            child: Align(
                child: Text('Gyroscope',
                    style: TextStyle(
                        fontWeight: FontWeight.bold, color: Colors.white))),
            color: primaryColor),
        Row(children: [
          Expanded(
              flex: 1,
              child: Container(
                  child: Column(
                    children: [
                      Text('X', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text(gyroX.toString(),
                          style: TextStyle(color: Colors.white))
                    ],
                  ),
                  color: secondaryColor,
                  padding: EdgeInsets.all(10))),
          Expanded(
              flex: 1,
              child: Container(
                  child: Column(
                    children: [
                      Text('Y', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text(gyroY.toString(),
                          style: TextStyle(color: Colors.white))
                    ],
                  ),
                  color: secondaryColor.withOpacity(0.8),
                  padding: EdgeInsets.all(10))),
          Expanded(
              flex: 1,
              child: Container(
                  child: Column(
                    children: [
                      Text('Z', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text(gyroZ.toString(),
                          style: TextStyle(color: Colors.white))
                    ],
                  ),
                  color: secondaryColor,
                  padding: EdgeInsets.all(10)))
        ])
      ]))
    ]);
  }
}
