import 'package:flutter/material.dart';
import '../screens/bluetoothScreen.dart';
import '../screens/nfcScreen.dart';
import '../screens/overview.dart';
import '../screens/gpsScreen.dart';
import '../screens/gyroscopeScreen.dart';
import '../screens/cameraScreen.dart';
import '../login/authentication.dart';

class pageRoutes {
  static const String overview = Overview.routeName;
  static const String nfc = NFCScreen.routeName;
  static const String bluetooth = BluetoothScreen.routeName;
  static const String gps = GPSScreen.routeName;
  static const String gyroscope = GyroscopeScreen.routeName;
  static const String camera = CameraScreen.routeName;
  static const String login = LoginPage.routeName;
}
