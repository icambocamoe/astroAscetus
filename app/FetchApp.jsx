// App.js
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';


const FetchApp = () => {
  const [response, setResponse] = useState(null);
  const fetchData = async () => {
    const url = 'https://astrologer.p.rapidapi.com/api/v4/birth-chart';
    const body = {
      "subject": {
        "name": "jehu",
        "year": 1997,
        "month": 4,
        "day": 8,
        "hour": 16,
        "minute": 41,
        "longitude": -103.349609,
        "latitude": 20.659698,
        "city": "Guadalajara",
        "timezone": "Mexico/General",
        "zodiac_type": "Tropic"
      }
    };
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        //'X-RapidAPI-Key': '861cf89b6bmsh5ee992a631165abp122b95jsn5c242c8cd7b8',
        //'X-RapidAPI-Host': 'astrologer.p.rapidapi.com'
      },
      body: JSON.stringify(body)
    };

    try {
      const response = await fetch(url, options);
	    const result = await response.json();
      setResponse(result);
      try {
        const response2 = await fetch('http://127.0.0.1:8000/save_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result),
        });
        if (!response2.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response2.json();
        console.log('Data saved successfully:', responseData);
      } catch (error) {
        console.error('Error sending data to backend:', error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
  
    <View style={styles.container}>
    <Button title="Fetch Data" onPress={fetchData} />
      
      {response && (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>{JSON.stringify(response, null, 2)}</Text>
        </ScrollView>
      )}
    </View>
    
    
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  scrollView: {
    marginVertical: 5,
    maxHeight: height, // Adjust this value based on your layout
  },
  text: {
    fontSize: 16,
  },
});

export default FetchApp;
