import React, {useState, useEffect,} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {TextInput, FAB,} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import {getSkills} from '../redux/actions';
import axios from 'axios';
import {BASE_URL} from '../Helper/helper';

const AddInterviewer = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [experience, setExperience] = useState('');
  const [skill, setSkill] = useState('');
  const [skillId, setSkillId] = useState('');
  const [techSkills, setTechSkills] = useState([]);
  const [postSkill, setPostSkills] = useState([]);

  //show skills to the list
  const addSkills = addedskill => {
    techSkills.id = techSkills.length + 1;
    setTechSkills([...techSkills, addedskill]);
  };

  //skills to send to url
  const postSkills = addedskill => {
    postSkill.id = postSkill.length + 1;
    setPostSkills([...postSkill, addedskill]);
  };

  //adding skills as array
  const onSaveSkill = () => {
    postSkills({
      skillsId: skillId,
      yearsofexperience: experience,
    });
    addSkills({
      skillsId: skillId,
      skill: skill,
      yearsofexperience: experience,
    });

    //emptying the skillinputs
    setSkill('');
    setSkillId('');
    setExperience('');
  };

  const genderData = [
    {label: 'Male', value: '1'},
    {label: 'Female', value: '2'},
  ];

  //get data from the reducers
  const {technologies, logindetails} = useSelector(
    state => state.moviesReducer,
  );

  //fetching the data using axios
  const dispatch = useDispatch();
  const fetchData = () =>
    dispatch(getSkills(logindetails.userId, logindetails.token));

  useEffect(() => {
    fetchData();
  }, []);

  //removing skills list
  const handleRemoveItem = skillsId => {
    setTechSkills(techSkills.filter(item => item.skillsId !== skillsId));
    setPostSkills(postSkill.filter(item => item.skillsId !== skillsId));
  };

  //initializing axios
  //const axios = require('axios').default;

  //header configuration for sending post data
  const addinterviewConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${logindetails.token}`,
    },
  };
  //send post data using axios using url.
  const goHome = (id, user, skillList) => {
    const interviewerData = {id: id, user: user, skillList: skillList};
    {
      // console.log('==================================== ASYNC');
      // console.log();
      // console.log('==================================== ASYNC');
      axios
        .post(
          BASE_URL + 'management/CreateInterviewPanelUser',
          interviewerData,
          addinterviewConfig,
        )
        .then(response => {
          if (response.data) {
            console.log('====================================');
            console.log(response.data);
            console.log('====================================');
            navigation.push('Home');
          } else {
            console.log('Unable to fetch');
          }
        });
    }
  };

  const onAddingInterviewer = () => {
    const id = '0';
    const user = {
      id: `${id}`,
      employeeid: `${employeeId}`,
      firstName: `${firstName}`,
      mobileNo: `${mobileNo}`,
      emailId: `${emailId}`,
      gender: `${gender}`,
      createdBy: `${logindetails.userId}`,
    };
    goHome(id, user, postSkill);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <TextInput
            label="First Name"
            value={firstName}
            mode="outlined"
            onChangeText={setFirstName}
            style={styles.title}
          />
          <TextInput
            label="Employee Id"
            value={employeeId}
            mode="outlined"
            onChangeText={setEmployeeId}
            style={styles.title}
          />
          <Dropdown
            data={genderData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select gender"
            value={gender}
            onChange={item => {
              setGender(item.value);
            }}
          />
          <TextInput
            label="Mobile No"
            value={mobileNo}
            mode="outlined"
            onChangeText={setMobileNo}
            style={styles.title}
          />
          <TextInput
            label="Email address"
            value={emailId}
            mode="outlined"
            onChangeText={setEmailId}
            style={styles.title}
          />
          {techSkills.length == 0 ? (
            <Text style={styles.title}>No skills</Text>
          ) : (
            <FlatList
              data={techSkills}
              renderItem={({item}) => (
                <View style={styles.skillfield}>
                  <Text>{item.skill}</Text>
                  <Text>{item.yearsofexperience}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.skillsId)}>
                    <Text>DEL</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.skillsId.toString()}
            />
          )}
          <View style={{flexDirection: 'row', flex: 1, width: '100%'}}>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <Dropdown
                data={technologies}
                maxHeight={100}
                labelField="technology"
                valueField="technology"
                placeholder="Select skills"
                value={skill}
                onChange={item => {
                  setSkill(item.technology);
                  setSkillId(item.id);
                }}
              />
            </View>
            <TextInput
              label="Experience"
              value={experience}
              mode="outlined"
              onChangeText={setExperience}
              style={{flex: 0.5, alignSelf: 'center'}}
            />
          </View>
          <TouchableOpacity onPress={() => onSaveSkill()}>
            <View style={styles.addButton}>
              <Text style={{alignSelf: 'center'}}>Add Skill</Text>
            </View>
          </TouchableOpacity>
          {/* <TextInput
                    label="Add Note Description"
                    value={noteDescription}
                    onChangeText={setNoteDescription}
                    mode="flat"
                    multiline={true}
                    style={styles.text}
                    scrollEnabled={true}
                    returnKeyLabel='done'
                    blurOnSubmit={true}
                /> */}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        label="Done"
        disabled={firstName == '' ? true : false}
        onPress={() => onAddingInterviewer()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  skillfield: {
    borderRadius: 15,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#cfd8dc',
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#000000',
  },
  addButton: {
    borderRadius: 15,
    width: 100,
    backgroundColor: '#ffc453',
    marginBottom: 2,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    backgroundColor: '#219653',
    position: 'absolute',
    alignItems: 'center',
    right: 10,
    top: 30,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  text: {
    height: 300,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#219653',
  },
});

export default AddInterviewer;
