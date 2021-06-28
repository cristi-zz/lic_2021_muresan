import 'package:flutter/material.dart';
import 'package:flutter_licenta/login/authentication.dart';
import '../routes/drawerNavigation.dart';
import 'package:flutter_licenta/routes/routes.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:geolocator/geolocator.dart';
import 'package:geocoding/geocoding.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../design/colors.dart';

class GPSScreen extends StatelessWidget {
  static const String routeName = '/gps';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: appBarColor,
          title: Text('GPS'),
          actions: <Widget>[
            IconButton(
                onPressed: () {
                  FirebaseAuth.instance.signOut();
                  Navigator.pushReplacementNamed(context, pageRoutes.login);
                },
                icon: Icon(Icons.exit_to_app_outlined, color: Colors.white))
          ],
        ),
        body: EnableGPS(),
        drawer: DrawerNavigation());
  }
}

class EnableGPS extends StatefulWidget {
  const EnableGPS({Key? key}) : super(key: key);

  @override
  _EnableGPSState createState() => _EnableGPSState();
}

class _EnableGPSState extends State<EnableGPS> {
  final items = <Location>[];
  void initState() {
    super.initState();
    CollectionReference locations =
        FirebaseFirestore.instance.collection('locations');
  }

  bool isEnabled = false;
  String title = 'Locatia mea';
  Geolocator gl = Geolocator();
  String latitude = '0';
  String longitude = '0';
  late Location loc;
  Future<void> _getLocation() async {
    var currentLocation;

    try {
      currentLocation = await Geolocator.getCurrentPosition(
          desiredAccuracy: LocationAccuracy.best);
      List<Placemark> placemarks = await placemarkFromCoordinates(
          currentLocation.latitude, currentLocation.longitude);
      print(placemarks.toString());
      latitude = currentLocation.latitude.toString();
      longitude = currentLocation.longitude.toString();
      loc = new Location(
          country: placemarks.first.country.toString(),
          city: placemarks.first.locality.toString(),
          street: placemarks.first.street.toString(),
          latitude: latitude,
          longitude: longitude);
      setState(() {
        items.add(loc);
      });
    } catch (e) {
      showAlert(context, e.toString());
    }
  }

  Future<void> buttonHandler() async {
    // if (isEnabled == false) {
    //   setState(() {
    //     title = 'Disable';
    //     isEnabled = true;
    //   });
    // } else {
    //   setState(() {
    //     title = 'Enable';
    //     isEnabled = false;
    //   });
    // }

    await _getLocation();
  }

  void saveLocation() {
    CollectionReference locations =
        FirebaseFirestore.instance.collection('locations');
    try {
      locations.add({
        'country': loc.country,
        'city': loc.city,
        'street': loc.street
      }).catchError((error) => print('Erroareee'));
    } catch (e) {
      showAlert(context, 'Eroare');
    }
  }

  void deleteAll() {
    CollectionReference locations =
        FirebaseFirestore.instance.collection('locations');

    locations.get().then((value) => {
          for (DocumentSnapshot ds in value.docs) {ds.reference.delete()}
        });
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        child: Column(mainAxisAlignment: MainAxisAlignment.start, children: [
      Padding(
          padding: const EdgeInsets.all(20),
          child: ElevatedButton(
              child: Text(title),
              onPressed: () => buttonHandler(),
              style: ElevatedButton.styleFrom(
                  primary: isEnabled ? disableButton : enableButton,
                  fixedSize: Size(200, 50)))),
      Card(
          child: Container(
        // height: 180,
        width: double.infinity,
        padding: EdgeInsets.all(10),
        child: Align(
            alignment: Alignment.topLeft,
            child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Row(children: [
                    Icon(Icons.location_on_outlined),
                    Text('Current location',
                        textAlign: TextAlign.start,
                        style: const TextStyle(fontWeight: FontWeight.bold))
                  ]),
                  Align(
                      alignment: Alignment.topLeft,
                      child: Row(children: [
                        Text(
                          'Latitude',
                          textAlign: TextAlign.left,
                          style: TextStyle(fontWeight: FontWeight.bold),
                        ),
                        Padding(
                            padding: EdgeInsets.all(10),
                            child: Text(
                              latitude,
                              style:
                                  TextStyle(color: Colors.white, fontSize: 18),
                            ))
                      ])),
                  Align(
                      alignment: Alignment.topLeft,
                      child: Row(children: [
                        Text('Longitudine',
                            style: TextStyle(fontWeight: FontWeight.bold)),
                        Padding(
                            padding: EdgeInsets.all(10),
                            child: Text(
                              longitude,
                              style:
                                  TextStyle(color: Colors.white, fontSize: 18),
                            ))
                      ])),
                  Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Align(
                            alignment: Alignment.topLeft,
                            child: ElevatedButton(
                                onPressed: saveLocation,
                                child: Text('Save'),
                                style: ElevatedButton.styleFrom(
                                    primary: enableButton))),
                        Align(
                            alignment: Alignment.topLeft,
                            child: ElevatedButton(
                                onPressed: deleteAll,
                                child: Text('Clear all'),
                                style: ElevatedButton.styleFrom(
                                    primary: enableButton)))
                      ])
                ])),
        color: secondaryColor,
      )),
      LocationsData()
    ]));
  }
}

class LocationsData extends StatefulWidget {
  const LocationsData({Key? key}) : super(key: key);

  @override
  _LocationsDataState createState() => _LocationsDataState();
}

class _LocationsDataState extends State<LocationsData> {
  final Stream<QuerySnapshot> _locationStream =
      FirebaseFirestore.instance.collection('locations').snapshots();

  @override
  Widget build(BuildContext context) {
    return StreamBuilder(
        stream: _locationStream,
        builder: (BuildContext context, AsyncSnapshot<QuerySnapshot> snapshot) {
          if (snapshot.hasError) {
            return Text('Error');
          }

          if (snapshot.connectionState == ConnectionState.waiting) {
            return CircularProgressIndicator();
          }

          return new DataTable(
              columns: [
                DataColumn(label: Text('Country')),
                DataColumn(label: Text('City')),
                DataColumn(label: Text('Street'))
              ],
              rows: snapshot.data!.docs.map((DocumentSnapshot doc) {
                Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
                return new DataRow(cells: [
                  new DataCell(Text(data['country'])),
                  new DataCell(Text(data['city'])),
                  new DataCell(Text(data['street']))
                ]);
              }).toList());
        });
  }
}

class Location {
  String latitude;
  String longitude;
  String country;
  String city;
  String street;

  Location(
      {required this.latitude,
      required this.longitude,
      required this.country,
      required this.city,
      required this.street});
}
