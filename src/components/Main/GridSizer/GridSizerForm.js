import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
    withStyles,
    makeStyles,
  } from '@material-ui/core/styles';
import strings from '../../../localization/label';

  const TextFieldCustomized = withStyles({
    root: {
      '& .MuiInputLabel-formControl': {
        color: 'white',
      },
      '& .MuiInputBase-input':{
        color:'white',
      },
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'green',
        },
      },
    },
  })(TextField);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      color: 'white',
      margin: theme.spacing(1),
    },
  }));
  
const GridSizerForm = ({m,n,min,max,handleMNChange}) => {
    const classes = useStyles();
    return(<>
          <Typography variant="h3" gutterBottom>{strings.form_title}</Typography>
              <Formik
                  initialValues={{ column:m,row:n }}
                  validate={values => {
                      const errors = {};
                      if (!values.column){
                        errors.column= "m can't be empty";
                      }
                      if (!values.row){
                        errors.row= "n can't be empty";
                      }
                      if (parseInt(values.column) < min || parseInt(values.column) > max )  {
                       errors.column= `Column should have a value greater than ${min} and less than ${max}`;
                      } 
                      if (parseInt(values.row) < min || parseInt(values.row) > max )  {
                        errors.row = `Row should have a value greater than ${min} and less than ${max}`;
                      } 
                      return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    handleMNChange(values);
                  }}
                  >
              {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValidating
                  /* and other goodies */
              }) => (
                  <Form>
                      <Grid container spacing={3}>
                          <Grid item xs={12}>
                                    <TextFieldCustomized 
                                      id="column_m" 
                                      type="data"
                                      label="Outlined"
                                      variant="outlined"
                                      className={classes.margin} 
                                      label={strings.enter_m}
                                      placeholder={strings.placeholder_m}
                                      name="column"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.column}
                                      multiline
                                      fullWidth={true}
                                      error={errors.column && touched.column}
                                      helperText={errors.column}
                                  />
                                  <TextFieldCustomized 
                                      id="row_n" 
                                      type="data"
                                      label="Outlined"
                                      variant="outlined"
                                      className={classes.margin} 
                                      label={strings.enter_n}
                                      placeholder={strings.placeholder_n}
                                      name="row"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.row}
                                      multiline
                                      fullWidth={true}
                                      error={errors.row && touched.row}
                                      helperText={errors.row}
                                  />
                          </Grid>
                          <Grid item xs={12}>
                              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting && isValidating}>
                                {strings.submit_button_label}
                              </Button>
                          </Grid>
                      </Grid>
                  </Form>
              )}
              </Formik>
          </>)
};

export default GridSizerForm;
