// import { useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { PatternFormat } from 'react-number-format';

// import './App.scss';

// function App() {
//   const stepsLength = 0;
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [done, setDone] = useState(false);

//   const handleBack = () => {
//     setStep((s) => s - 1);
//   };

//   const handleNext = async (fields) => {
//     const isStepValid = await trigger(fields);
//     isStepValid && step < stepsLength && setStep((s) => s + 1);
//   };

//   const methods = useForm({
//     mode: 'onChange',
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     trigger,
//     control,
//   } = methods;

//   const onSubmit = (data) => {
//     setLoading(true);
//     if (data.phone === undefined) {
//       const modifiedData = {
//         ...data,
//         phone: '+1 (000) 000 0000',
//       };
//       postSecureData(QAC_URL, modifiedData, SECRET)
//         .then((res) => res.json())
//         .then((data) => {
//           setLoading(false);
//           setDone(true);
//         })
//         .catch((err) => {
//           setLoading(false);
//           setDone(true);
//         });
//     } else {
//       postSecureData(QAC_URL, data, SECRET)
//         .then((res) => res.json())
//         .then((data) => {
//           setLoading(false);
//           setDone(true);
//         })
//         .catch((err) => {
//           setLoading(false);
//           setDone(true);
//         });
//     }
//   };

//   return (
//     <>
//       <div className="step-form-box">
//         <div className="step-form-box-progress">
//           <div
//             className="step-form-box-progress-bar"
//             style={{ width: `${(100 / stepsLength) * step}%` }}
//           ></div>
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {loading && (
//             <div className="form-loading">
//               <img
//                 src="https://uploads-ssl.webflow.com/65757661e64ae8bdcd14c87d/65ae4f3386c1ef82adb75b7f_loader.svg"
//                 alt="loading"
//               />
//             </div>
//           )}

//           {/* Step 1 */}
//           {step === 1 && !done && (
//             <div className="step">
//               <div className="step-body">
//                 <h3 className="step-title">
//                   Are you looking for individual or family coverage?
//                 </h3>
//                 <div className="step-fields-line">
//                   <label
//                     className="step-fields-line-field"
//                     htmlFor="individual"
//                   >
//                     <input
//                       type="radio"
//                       id="individual"
//                       name="coverage"
//                       value="individual"
//                       {...register('coverage', {
//                         required: true,
//                       })}
//                     />
//                     <span className="radio"></span>
//                     Individual
//                   </label>
//                   <label className="step-fields-line-field" htmlFor="family">
//                     <input
//                       type="radio"
//                       id="family"
//                       name="coverage"
//                       value="family"
//                       {...register('coverage', {
//                         required: true,
//                       })}
//                     />
//                     <span className="radio"></span>
//                     Family
//                   </label>
//                 </div>
//               </div>
//               <div className="step-footer">
//                 <div className="step-action">
//                   <button
//                     type="button"
//                     onClick={() => handleNext(['coverage'])}
//                     className={`next ${isValid ? 'valid' : ''}`}
//                   >
//                     Next
//                   </button>
//                 </div>
//                 {errors['individual-coverage'] && (
//                   <div className="step-note">Please make your choice</div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Step 2 */}

//           {step === 2 && !done && (
//             <div className="step">
//               <div className="step-body">
//                 <h3 className="step-title">How old are you?</h3>
//                 <div className="step-fields-line">
//                   <div>
//                     <select
//                       className="step-fields-line-field"
//                       name="age"
//                       id="age"
//                       {...register('age', {
//                         required: true,
//                       })}
//                     >
//                       <option value="" disabled="" defaultValue>
//                         Select option
//                       </option>
//                       <option value="18-25">18-25</option>
//                       <option value="26-34">26-34</option>
//                       <option value="35-44">35-44</option>
//                       <option value="45-59">45-59</option>
//                       <option value="Over 60">Over 60</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="step-footer">
//                 <div className="step-action">
//                   <button type="button" className="back" onClick={handleBack}>
//                     Back
//                   </button>
//                   <button
//                     type="button"
//                     className={`next ${isValid ? 'valid' : ''}`}
//                     onClick={() => handleNext(['age'])}
//                   >
//                     Next
//                   </button>
//                 </div>
//                 {errors.age && (
//                   <div className="step-note">Please select an option</div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Step 3 */}
//           {step === 3 && !done && (
//             <div className="step">
//               <div className="step-body">
//                 <h3 className="step-title">
//                   What is your expected 2023 household income?
//                 </h3>
//                 <div className="step-fields-line">
//                   <div>
//                     <select
//                       name="household"
//                       id="household"
//                       className="step-fields-line-field"
//                       {...register('household', {
//                         required: true,
//                       })}
//                     >
//                       <option value="" disabled="" defaultValue>
//                         Select option
//                       </option>
//                       <option value="Below $16,000">Below $16,000</option>
//                       <option value="$17,000 - $29,999">
//                         $17,000 - $29,999
//                       </option>
//                       <option value="$30,000 - $49,999">
//                         $30,000 - $49,999
//                       </option>
//                       <option value="$50,000 - $74,999">
//                         $50,000 - $74,999
//                       </option>
//                       <option value="$75,000 - $99,999">
//                         $75,000 - $99,999
//                       </option>
//                       <option value="Over $100,000">Over $100,000</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="step-footer">
//                 <div className="step-action">
//                   <button type="button" className="back" onClick={handleBack}>
//                     Back
//                   </button>
//                   <button
//                     type="button"
//                     className={`next ${isValid ? 'valid' : ''}`}
//                     onClick={() => handleNext(['household'])}
//                   >
//                     Next
//                   </button>
//                 </div>
//                 {errors.household && (
//                   <div className="step-note">Please select an option</div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Step 4 */}
//           {step === 4 && !done && (
//             <div className="step">
//               <div className="step-body">
//                 <h3 className="step-title">What is your gender?</h3>
//                 <div className="step-fields-line">
//                   <label className="step-fields-line-field" htmlFor="male">
//                     <input
//                       type="radio"
//                       id="male"
//                       name="gender"
//                       {...register('gender', {
//                         required: true,
//                       })}
//                       value="male"
//                     />
//                     <span className="radio"></span>
//                     Male
//                   </label>
//                   <label className="step-fields-line-field" htmlFor="female">
//                     <input
//                       type="radio"
//                       id="female"
//                       name="gender"
//                       {...register('gender', {
//                         required: true,
//                       })}
//                       value="female"
//                     />
//                     <span className="radio"></span>
//                     Female
//                   </label>
//                 </div>
//               </div>
//               <div className="step-footer">
//                 <div className="step-action">
//                   <button type="button" className="back" onClick={handleBack}>
//                     Back
//                   </button>
//                   <button
//                     type="button"
//                     className={`next ${isValid ? 'valid' : ''}`}
//                     onClick={() => handleNext(['gender'])}
//                   >
//                     Next
//                   </button>
//                 </div>
//                 {errors.gender && (
//                   <div className="step-note">Please make your choice</div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Step 5 */}
//           {step === 5 && !done && (
//             <div className="step">
//               <div className="step-body">
//                 <h3 className="step-title">
//                   Do you have any of the following conditions:
//                 </h3>
//                 <h4 className="step-subtitle">
//                   Cancer, Heart Attack, Stroke, Diabetes, AIDS/HIV, Pulmonary
//                   Disease
//                 </h4>
//                 <div className="step-fields-line">
//                   <label
//                     className="step-fields-line-field"
//                     htmlFor="condition-yes"
//                   >
//                     <input
//                       type="radio"
//                       id="condition-yes"
//                       name="conditions"
//                       {...register('conditions', {
//                         required: true,
//                       })}
//                       value="yes"
//                     />
//                     <span className="radio"></span>
//                     Yes
//                   </label>
//                   <label
//                     className="step-fields-line-field"
//                     htmlFor="condition-no"
//                   >
//                     <input
//                       type="radio"
//                       id="condition-no"
//                       name="conditions"
//                       {...register('conditions', {
//                         required: true,
//                       })}
//                       value="no"
//                     />
//                     <span className="radio"></span>
//                     No
//                   </label>
//                 </div>
//               </div>
//               <div className="step-footer">
//                 <div className="step-action">
//                   <button type="button" className="back" onClick={handleBack}>
//                     Back
//                   </button>
//                   <button
//                     type="button"
//                     className={`next ${isValid ? 'valid' : ''}`}
//                     onClick={() => handleNext(['conditions'])}
//                   >
//                     Next
//                   </button>
//                 </div>
//                 {errors.conditions && (
//                   <div className="step-note">Please make your choice</div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Step 6 */}
//           {step === 6 && !done && (
//             <div className="step">
//               <div className="step-body">
//                 <h3 className="step-title">What is your name?</h3>
//                 <div className="step-fields-line">
//                   <div>
//                     <input
//                       className="step-fields-line-field"
//                       type="text"
//                       name="first-name"
//                       id="name"
//                       placeholder="First Name"
//                       {...register('firstName', {
//                         required: true,
//                         pattern: {
//                           value: /^[A-Za-z]+$/,
//                           message:
//                             'The "First Name" field should only contain letters. Please revise your entry.',
//                         },
//                         // onChange: (e) => {
//                         //   const re = /[^a-zA-Z]/g;
//                         //   e.target.value = e.target.value.replace(re, '');
//                         // },
//                       })}
//                     />
//                   </div>
//                   <div>
//                     <input
//                       className="step-fields-line-field"
//                       type="text"
//                       name="last-name"
//                       id="surname"
//                       placeholder="Last Name"
//                       {...register('lastName', {
//                         required: true,
//                         pattern: {
//                           value: /^[A-Za-z]+$/,
//                           message:
//                             'The "Last Name" field should only contain letters. Please revise your entry.',
//                         },
//                       })}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="step-footer">
//                 <div className="step-action">
//                   <button type="button" className="back" onClick={handleBack}>
//                     Back
//                   </button>
//                   <button
//                     type="button"
//                     className={`next ${isValid ? 'valid' : ''}`}
//                     onClick={() => handleNext(['firstName', 'lastName'])}
//                   >
//                     Next
//                   </button>
//                 </div>
//                 {(errors.firstName || errors.lastName) && (
//                   <div className="step-note">
//                     {errors.firstName && errors.firstName.message}
//                     {errors.lastName && errors.lastName.message}
//                     {!errors?.firstName?.message &&
//                       !errors?.lastName?.message &&
//                       'Please fill all fields'}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Step 7 */}
//           {step === 7 && !done && (
//             <div className="step">
//               <div className="step-body">
//                 <h3 className="step-title">What is your phone number?</h3>
//                 <div className="step-fields-line">
//                   <div>
//                     <Controller
//                       name="phone"
//                       control={control}
//                       render={({ field: { name, value, onChange } }) => (
//                         <PatternFormat
//                           name={name}
//                           value={value}
//                           onChange={onChange}
//                           defaultValue="00 000 00000"
//                           format="+1 (###) ### ####"
//                           allowEmptyFormatting
//                           mask={0}
//                           required
//                           className="step-fields-line-field"
//                         />
//                       )}
//                     />
//                   </div>
//                 </div>
//                 <label htmlFor="agree" className="submit-note">
//                   <div className="input-box">
//                     <input
//                       type="checkbox"
//                       name="agree"
//                       id="agree"
//                       {...register('agree', {
//                         required: true,
//                       })}
//                     />
//                     <span className="checkbox"></span>
//                   </div>
//                   <span>
//                     By checking this box you agree to the terms and conditions
//                     of our Text Messaging Program and Privacy Policy allowing
//                     Policy Saver Insurance and affiliates to text you about
//                     opportunities related to this inquiry and other
//                     opportunities or information via text. Message and data
//                     rates may apply. Reply STOP to opt out. Messaging frequency
//                     may vary. Reply HELP for further assistance
//                   </span>
//                 </label>
//               </div>
//               <div className="step-footer">
//                 <div className="step-action">
//                   <button type="button" className="back" onClick={handleBack}>
//                     Back
//                   </button>
//                   <button
//                     type="submit"
//                     className={`next ${isValid ? 'valid' : ''}`}
//                     onClick={() => handleNext(['phone', 'agree'])}
//                   >
//                     Get a quote
//                   </button>
//                 </div>
//                 {errors.agree && (
//                   <div className="step-note">Please agree the terms</div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Step 8 */}
//           {done && (
//             <div className="step">
//               <div className="step-body">
//                 <div className="icon-box" style={{ margin: '0 auto 2.5rem' }}>
//                   <img
//                     src="https://uploads-ssl.webflow.com/65757661e64ae8bdcd14c87d/65ae4f331d4812f6ca0b7b2a_heart-icon.svg"
//                     alt="like"
//                   />
//                 </div>
//                 <h3 className="step-title">Thank You for Requesting a Quote</h3>
//                 <p>
//                   One of our licensed insurance agent will contact you shortly!
//                 </p>
//               </div>
//             </div>
//           )}
//         </form>
//       </div>
//     </>
//   );
// }

// export default App;
