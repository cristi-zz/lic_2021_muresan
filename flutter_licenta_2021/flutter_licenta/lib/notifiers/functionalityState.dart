import 'package:flutter/material.dart';

class FuncState extends ChangeNotifier {
  FuncState(
      {required this.nfc,
      required this.gps,
      required this.bluetooth,
      required this.gyroscope});
  bool nfc;
  bool gps;
  bool gyroscope;
  bool bluetooth;

  void setNFC(bool value) {
    this.nfc = value;
    notifyListeners();
  }

  void setGPS(bool value) {
    this.gps = value;
    notifyListeners();
  }

  void setGyroscope(bool value) {
    this.gyroscope = value;
    notifyListeners();
  }

  void setBluetooth(bool value) {
    this.bluetooth = value;
    notifyListeners();
  }
}
