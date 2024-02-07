import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import SignatureCanvas from 'react-signature-canvas';
import { Modal } from './Modal';
import './App.scss';
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';

function App() {
  const stepsLength = 4;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [modal, setModal] = useState(false);

  const affirmRef = useRef();
  const agreeRef = useRef();
  const [affirmURL, setAffirmURL] = useState(null);
  const [agreeURL, setAgreeURL] = useState(null);

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const handleNext = async (fields) => {
    const isStepValid = await trigger(fields);
    isStepValid && step < stepsLength && setStep((s) => s + 1);
  };

  const formatIntoPng = (value) => {
    switch (value) {
      case 'affirm':
        if (affirmRef.current) {
          const dataURL = affirmRef.current.toDataURL();
          return dataURL;
        }
        break;

      case 'agree':
        if (agreeRef.current) {
          const dataURL = agreeRef.current.toDataURL();
          return dataURL;
        }
        break;
    }
  };

  const deleteSign = (value) => {
    switch (value) {
      case 'affirm':
        affirmRef.current
          .getCanvas()
          .closest('.signature-box')
          .classList.remove('pressed');
        affirmRef.current?.clear();
        break;
      case 'agree':
        agreeRef.current
          .getCanvas()
          .closest('.signature-box')
          .classList.remove('pressed');
        agreeRef.current?.clear();
        break;
    }
  };

  const methods = useForm({
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    control,
  } = methods;

  const onSubmit = (data) => {
    setLoading(true);
  };

  //
  const handlePDF = () => {
    const URL = agreeRef.current.getTrimmedCanvas().toDataURL();
    URL && setAgreeURL(URL);
    setDone(true);
  };

  const MyDocument = () => (
    <Document>
      <Page size="A4">
        <Text>Section #1</Text>
        <Text>Section #2</Text>
        {agreeURL && <Image src={agreeURL} />}
      </Page>
    </Document>
  );

  const pdf = (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );

  return (
    <>
      <div className="step-form-box" style={{ maxWidth: 750 }}>
        <div className="step-form-box-progress">
          <div
            className="step-form-box-progress-bar"
            style={{ width: `${(100 / stepsLength) * step}%` }}
          ></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loading && (
            <div className="form-loading">
              <img
                src="https://uploads-ssl.webflow.com/65757661e64ae8bdcd14c87d/65ae4f3386c1ef82adb75b7f_loader.svg"
                alt="loading"
              />
            </div>
          )}
          {/* STEP 1 */}
          <div className={`form-step ${step === 0 ? 'active' : ''}`}>
            <div className="form-step-body">
              <div className="form-fields">
                <div
                  className={`form-field ${errors.firstName ? 'error' : ''}`}
                >
                  <label htmlFor="first-name" className="form-field-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    placeholder="First Name"
                    {...register('firstName', {
                      required: true,
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message:
                          'The field should only contain alphabetic letters. Please revise your entry.',
                      },
                      onChange: (e) => {
                        const re = /[^a-zA-Z]/g;
                        e.target.value = e.target.value.replace(re, '');
                      },
                    })}
                  />
                  <span className="form-field-bg"></span>
                  {errors.firstName && (
                    <span className="form-field-note">
                      {errors.firstName?.message || 'This field is required.'}
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="last-name" className="form-field-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    placeholder="Last Name"
                    {...register('lastName', {
                      required: true,
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message:
                          'The field should only contain alphabetic letters. Please revise your entry.',
                      },
                      onChange: (e) => {
                        const re = /[^a-zA-Z]/g;
                        e.target.value = e.target.value.replace(re, '');
                      },
                    })}
                  />
                  <span className="form-field-bg"></span>
                  {errors.lastName && (
                    <span className="form-field-note">
                      {errors.lastName?.message || 'This field is required.'}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="last-name" className="form-field-label">
                    Phone Number
                  </label>

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        onChange={onChange}
                        value={value}
                        placeholder="(000) 000-0000"
                        disableCountryCode={true}
                        defaultMask="(...) ...-...."
                        alwaysDefaultMask={true}
                        specialLabel=""
                      />
                    )}
                    rules={{
                      required: true,
                      minLength: {
                        value: 10,
                        message: 'Field value must fill mask.',
                      },
                    }}
                  />
                  <span className="form-field-bg"></span>
                  {errors.phone && (
                    <span className="form-field-note">
                      {errors.phone?.message || 'This field is required.'}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="last-name" className="form-field-label">
                    Social Security Number (SSN)
                  </label>

                  <Controller
                    name="ssn"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        onChange={onChange}
                        value={value}
                        placeholder="123-45-6789"
                        disableCountryCode={true}
                        defaultMask="...-..-...."
                        alwaysDefaultMask={true}
                        specialLabel=""
                      />
                    )}
                    rules={{
                      required: true,
                      minLength: {
                        value: 9,
                        message: 'Field value must fill mask.',
                      },
                    }}
                  />
                  <span className="form-field-bg"></span>
                  {errors.ssn && (
                    <span className="form-field-note">
                      {errors.ssn?.message || 'This field is required.'}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="form-step-footer">
              <div></div>
              <div>
                {(errors.firstName ||
                  errors.lastName ||
                  errors.phone ||
                  errors.ssn) && (
                  <span className={`form-step-note ${!isValid ? 'error' : ''}`}>
                    There are errors on this page. Please fix them before
                    continuing.
                  </span>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    handleNext(['firstName', 'lastName', 'phone', 'ssn'])
                  }
                  className={`btn ${isValid ? 'valid' : ''}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          <div className={`form-step ${step === 2 ? 'active' : ''}`}>
            <div className="form-step-body">
              <h5>
                By initialing below, you affirm that you have read, understand,
                and acknowledge the information included in your application and
                that:
              </h5>
              <p>
                You give the agent permission to begin working on my behalf in
                the marketplace. This permission includes the ability to:
              </p>
              <ol>
                <li>
                  Access my account, gather information, and update and act as
                  the agent of record.
                </li>
                <li>
                  Complete any existing or new application for eligibility for
                  or enrollment into a health plan.
                </li>
                <li>
                  Provide ongoing account maintenance or assistance as needed.
                </li>
              </ol>
              <p>
                I have received my application. I confirm that I agree with the
                above statement and all of the information I have provided is
                accurate and complete.
              </p>

              <p>[Initial in the Box Below to Agree and Confirm]</p>

              <div className="signature-box">
                <div className="signature-box-body">
                  <Controller
                    name="affirm"
                    control={control}
                    render={({ field }) => (
                      <SignatureCanvas
                        penColor="#117299"
                        minDistance={0}
                        throttle={0}
                        clearOnResize={false}
                        canvasProps={{ className: 'pad' }}
                        ref={affirmRef}
                        onEnd={() => field.onChange(formatIntoPng('affirm'))}
                      />
                    )}
                    rules={{
                      required: true,
                      validate: () => !affirmRef.current.isEmpty(),
                    }}
                  />
                </div>
                <div className="signature-box-footer">
                  <button
                    type="button"
                    className="signature-clear"
                    onClick={() => {
                      deleteSign('affirm');
                      handleNext(['affirm']);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
              {errors.affirm && (
                <span className="form-field-note">
                  {errors.affirm?.message || 'This field is required.'}
                </span>
              )}
            </div>
            <div className="form-step-footer">
              <div>
                <button type="button" className="btn" onClick={handleBack}>
                  Previous
                </button>
              </div>
              <div>
                {Object.keys(errors).length !== 0 && (
                  <span className={`form-step-note ${!isValid ? 'error' : ''}`}>
                    There are errors on this page. Please fix them before
                    continuing.
                  </span>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleNext(['affirm'])}
                  className={`btn ${isValid ? 'valid' : ''}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className={`form-step ${step === 1 ? 'active' : ''}`}>
            <div className="form-step-body">
              <h5>
                By signing in the space provided, you acknowledge, consent, and
                agree to the following:
              </h5>
              <ol>
                <li>
                  You confirm that the information you've provided on the
                  application is accurate to the best of your knowledge.
                </li>
                <li>
                  You grant your agent, or an employee under your agent, the
                  authority to access your healthcare.gov account. This access
                  is to assist in enrolling, updating, or renewing your
                  coverage, responding to requests for additional information,
                  and making necessary updates as required.
                </li>
                <li>
                  Your agent is authorized to act as the agent of record on your
                  account, enabling them to complete the tasks mentioned above
                  and inform you if further information is needed for your
                  account. Should your current plan remain the most suitable,
                  your agent will act as the broker and oversee your plan.
                </li>
                <li>
                  You allow your agent to periodically review your account to
                  keep you informed about required documentation from
                  healthcare.gov, including but not limited to requests for
                  proof of income, incarceration status, and citizenship.
                </li>
                <li>
                  In the event another agent modified your plan, you grant your
                  agent the right to take charge of the new plan and inform you
                  of such changes. This consent is valid for two years from the
                  data of the agreement and can be renewed for an additional two
                  years through email, text, or a phone call with your agent.
                </li>
                <li>
                  You have the right to withdraw these permissions at any time
                  by providing written notice via email or text, or verbally
                  during a phone conversation with your agent.
                </li>
                <li>
                  You authorize updates to your current plan or the initiation
                  of a new plan that aligns more closely to your needs.
                </li>
                <li>
                  You consent to be contacted in the future regarding any
                  matters that may impact you or your healthcare coverage.
                </li>
                <li>
                  You grant permission to your agent, their assigned agency, and
                  affiliated parties to represent you in the marketplace. This
                  includes:
                  <ul>
                    <li>
                      Searching the marketplace for any existing plans or
                      applications linked to your account.
                    </li>
                    <li>
                      Completing any pending applications for eligibility or
                      enrollment in a Qualified Marketplace Health Plan, other
                      government health plan applications, and available tax
                      credits.
                    </li>
                    <li>
                      Offering ongoing account support, maintenance, and
                      responding to any marketplace inquiries about your
                      application.
                    </li>
                  </ul>
                </li>
              </ol>

              <h5>
                By signing, you affirm your understanding and acceptance of the
                above terms and entrust us with the responsibility of finding
                the most suitable healthcare plan for you.
              </h5>

              <div className={`signature-box bg`}>
                <div className="signature-box-body">
                  <Controller
                    name="agree"
                    control={control}
                    render={({ field }) => (
                      <SignatureCanvas
                        penColor="#117299"
                        minDistance={0}
                        throttle={0}
                        clearOnResize={false}
                        canvasProps={{ className: 'pad' }}
                        ref={agreeRef}
                        onBegin={() => {
                          agreeRef.current
                            .getCanvas()
                            .closest('.signature-box')
                            .classList.add('pressed');
                        }}
                        onEnd={() => {
                          field.onChange(formatIntoPng('agree'));
                        }}
                      />
                    )}
                    rules={{
                      required: true,
                      validate: () => !agreeRef.current.isEmpty(),
                    }}
                  />
                </div>
                <div className="signature-box-footer">
                  <button
                    type="button"
                    className="signature-clear"
                    onClick={() => {
                      deleteSign('agree');
                      handleNext(['agree']);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
              {errors.agree && (
                <span className="form-field-note">
                  {errors.agree?.message || 'This field is required.'}
                </span>
              )}
            </div>
            <div className="form-step-footer">
              <div>
                <button type="button" className="btn" onClick={handleBack}>
                  Previous
                </button>
              </div>
              <div>
                {Object.keys(errors).length !== 0 && (
                  <span className={`form-step-note ${!isValid ? 'error' : ''}`}>
                    There are errors on this page. Please fix them before
                    continuing.
                  </span>
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    handlePDF();
                    setModal(true);
                  }}
                  className={`btn ${isValid ? 'valid' : ''}`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
        {modal && <Modal close={() => setModal(false)}>{done && pdf}</Modal>}
      </div>
    </>
  );
}

export default App;
