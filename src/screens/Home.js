import React, {useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {FAB} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {getInterviewerUserList, getSkills} from '../redux/actions';
const Home = ({navigation}) => {
  //using reducer to get the data
  const {interviewer, logindetails} = useSelector(state => state.moviesReducer);
  const dispatch = useDispatch();
  //using action and getting data
  const fetchInterviewerList = () =>
    dispatch(getInterviewerUserList(logindetails.userId, logindetails.token));
  const fetchData = () =>
    dispatch(getSkills(logindetails.userId, logindetails.token));

  useEffect(() => {
    fetchInterviewerList();
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, marginTop: 44, paddingHorizontal: 20}}>
      <Text style={{fontSize: 22}}>InterViewer List</Text>
      <View style={{flex: 1, marginTop: 12, width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}>
          <Text style={{marginHorizontal: 10}}>FAS ID</Text>
          <Text style={{marginHorizontal: 10}}>NAME</Text>
        </View>
        <FlatList
          data={interviewer}
          style={{flex: 1, width: '100%'}}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <View style={styles.inputfield}>
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 20}}>{item.employeeid}</Text>
                  <Text style={{fontSize: 20}}>{item.firstName}</Text>
                </View>
                <View style={{marginVertical: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 2,
                      justifyContent: 'space-between',
                    }}>
                    <Text>Mobile Number</Text>
                    <Text style={{fontSize: 16, marginHorizontal: 2}}>
                      {item.mobileNo}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 2,
                      justifyContent: 'space-between',
                    }}>
                    <Text>Email</Text>
                    <Text style={{fontSize: 16, marginHorizontal: 2}}>
                      {item.emailId}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 2,
                      justifyContent: 'space-between',
                    }}>
                    <Text>Gender</Text>
                    {item.gender === 1 ? (
                      <Text>Male</Text>
                    ) : (
                      <Text>Female</Text>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 2,
                      justifyContent: 'space-between',
                    }}>
                    <Text>Skills</Text>
                    <Text style={{fontSize: 16, marginHorizontal: 2}}>
                      {item.skills}
                    </Text>
                  </View>
                </View>
                <View style={{width: '100%', justifyContent: 'space-around'}}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push('UpdateCandidate', {
                        itemId: item.id,
                        otherParam: item,
                      })
                    }>
                    <Text>EDIT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FAB
        style={styles.fab}
        small
        label="Add Candidate"
        onPress={() => navigation.push('AddNewCandidate')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#219653',
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10,
  },
  inputfield: {
    borderRadius: 15,
    padding: 12,
    backgroundColor: '#cfd8dc',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
});

export default Home;
