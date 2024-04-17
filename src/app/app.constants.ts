export const appConstants = 
{
    emailRegx:/^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
    passwordRegx:/^(?=.*[A-Z]).{6,}$/,
    defaultPassword:'Password',
    AESKey:'this_is_a_key',
    spaceValidator:/.*\S.*/,
    displayedColumnsAll:['name','email','gender','dob','role'],
    displayedColumnsStudentsAndTeachers:['name','email','gender','dob','edit','delete']
}