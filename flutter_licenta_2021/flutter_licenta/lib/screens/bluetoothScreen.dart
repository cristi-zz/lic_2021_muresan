import 'package:flutter/material.dart';
import 'package:flutter_licenta/login/authentication.dart';
import 'package:loader_overlay/loader_overlay.dart';
import '../routes/drawerNavigation.dart';
import 'package:flutter_licenta/routes/routes.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_blue/flutter_blue.dart';
import '../design/colors.dart';
import 'package:bottom_loader/bottom_loader.dart';

class BluetoothScreen extends StatelessWidget {
  static const String routeName = '/bluetoothScreen';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('Bluetooth'),
          backgroundColor: appBarColor,
          actions: <Widget>[
            IconButton(
                onPressed: () {
                  FirebaseAuth.instance.signOut();
                  Navigator.pushReplacementNamed(context, pageRoutes.login);
                },
                icon: Icon(Icons.exit_to_app_outlined, color: Colors.white))
          ],
        ),
        body: LoaderOverlay(child: BluetoothRead()),
        drawer: DrawerNavigation());
  }
}

class BluetoothRead extends StatefulWidget {
  const BluetoothRead({Key? key}) : super(key: key);
  @override
  _BluetoothState createState() => _BluetoothState();
}

class _BluetoothState extends State<BluetoothRead> {
  final items = <String>[];

  bool isEnabled = false;
  String title = 'Enable';

  Future<void> bluetoothRead(BuildContext context) async {
    FlutterBlue fb = FlutterBlue.instance;
    BottomLoader bl = new BottomLoader(context, isDismissible: true);

    if (isEnabled == false) {
      setState(() {
        title = 'Disable';
        isEnabled = true;
        items.add('Blana');
      });
    } else {
      setState(() {
        title = 'Enable';
        isEnabled = false;
      });
    }

    if (isEnabled) {
      bool isAvailable = await fb.isAvailable;
      if (isAvailable) {
        await bl.display();
        try {
          await fb.startScan(timeout: Duration(seconds: 5));
        } catch (e) {
          showAlert(context, 'e');
        }

        var subscription = fb.scanResults.listen((results) {
          for (ScanResult r in results) {
            items.add(r.device.name.toString());
            print('${r.device.name} found! rssi: ${r.rssi}');
          }
        });
        setState(() {
          items.add('blana');
        });

        subscription.cancel();
        fb.stopScan();
        bl.close();
      } else {
        showAlert(context, 'Not available! Check if it is enabled.');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(mainAxisAlignment: MainAxisAlignment.start, children: [
      Padding(
          padding: const EdgeInsets.all(20),
          child: ElevatedButton(
              child: Text(title),
              onPressed: () => bluetoothRead(context),
              style: ElevatedButton.styleFrom(
                  primary: isEnabled ? disableButton : enableButton,
                  fixedSize: Size(200, 50)))),
      ListView.builder(
        physics: NeverScrollableScrollPhysics(),
        shrinkWrap: true,
        itemCount: items.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text('${items[index]}'),
          );
        },
      )
    ]);
  }
}
