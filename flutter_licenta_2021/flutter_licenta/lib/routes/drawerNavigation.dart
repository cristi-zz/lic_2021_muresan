import 'package:flutter/material.dart';
import 'routes.dart';
import '../design/colors.dart';

class DrawerNavigation extends StatelessWidget {
  const DrawerNavigation({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
        child: ListView(padding: EdgeInsets.zero, children: <Widget>[
      DrawerHeader(decoration: BoxDecoration(color: appBarColor), child: null),
      ListTile(
          title: Text('Overview'),
          onTap: () {
            Navigator.pop(context);
            Navigator.pushReplacementNamed(context, pageRoutes.overview);
          }),
      ListTile(
          title: Text('NFC'),
          onTap: () {
            Navigator.pop(context);
            Navigator.pushReplacementNamed(context, pageRoutes.nfc);
          }),
      ListTile(
          title: Text('Bluetooth'),
          onTap: () {
            Navigator.pop(context);
            Navigator.pushReplacementNamed(context, pageRoutes.bluetooth);
          }),
      ListTile(
          title: Text('GPS'),
          onTap: () {
            Navigator.pop(context);
            Navigator.pushReplacementNamed(context, pageRoutes.gps);
          }),
      ListTile(
          title: Text('Gyroscope'),
          onTap: () {
            Navigator.pop(context);
            Navigator.pushReplacementNamed(context, pageRoutes.gyroscope);
          }),
      ListTile(
          title: Text('Camera'),
          onTap: () {
            Navigator.pop(context);
            Navigator.pushReplacementNamed(context, pageRoutes.camera);
          }),
    ]));
  }
}
