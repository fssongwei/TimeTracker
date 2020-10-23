import React from "react";
import { View, StyleSheet } from "react-native";
import { CalendarList } from "react-native-calendars";

const Calendar = (props) => {
  const { selectedDate } = props.route.params;
  const markedDate = (date) => {
    let obj = {};
    obj[date] = {
      selected: true,
    };
    return obj;
  };

  return (
    <View style={styles.screen}>
      <CalendarList
        maxDate={Date()}
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={36}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={0}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        markedDates={markedDate(selectedDate)}
        onDayPress={(day) => {
          props.navigation.navigate("Record", { selectedDate: day.dateString });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default Calendar;
