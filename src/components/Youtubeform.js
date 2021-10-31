import React, {useState} from 'react'
import { Form, Formik, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'


let initialValues = {
	name: "Joseph",
	email: "",
	channel: "",
	comments: "",
	address: "",
	social: {
		facebook: "",
		twitter: "",
		github: ""
	},
	phoneNumbers: ["", ""],
	tags: [""]
}

let savedData = {
	name: "John Doe",
	email: "johndoe@mail.com",
	channel: "channel johnes",
	comments: "welcome to my johnes channel where we discuss about eating invertabrates like locust",
	address: "1231 Jordan",
	social: {
		facebook: "JDoe525",
		twitter: "Mr JohnnyD",
		github: "Johnes"
	},
	phoneNumbers: ["0712345678", "07234565789"],
	tags: ["mr", "johness", "doe", "salvation man", "river man", "grasshopper eater"]
}

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string()
	  .email('Invalid email format')
	  .required('Required'),
	channel: Yup.string().required('Required'),
	comments: Yup.string().required('Required'),
	address: Yup.string().required('Required'),
  })

const onSubmit = (values, onSubmitProps) => {
	console.log("The form data is", values)
	console.log("submit props", onSubmitProps)
	// after an APi call function is done
	onSubmitProps.setSubmitting(false)
	onSubmitProps.resetForm()
}



const Youtubeform = () => {
	const [formValues, setFormValues] = useState(null)

	return (
		<Formik
			initialValues={formValues || initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			validateOnChange={false}
			enableReinitialize
		>
			{
				formik => {
					console.log("formik props", formik)
					return (
						<Form>
							<div className="form-control">
								<label htmlFor="name" >Name</label>
								<Field type ="text" id="name" name="name" />
								<ErrorMessage component={TextError} name="name" />
							</div>
							
							<div className="form-control">
								<label htmlFor="email" >Email</label>
								<Field type ="email" id="email" name="email" />
								<ErrorMessage component={TextError} name="email" />
							</div>
							
							
							<div className="form-control">
								<label htmlFor="channel" >Channel</label>
								<Field type ="text" id="channel" name="channel" />
								<ErrorMessage component={TextError} name="channel" />
							</div>
							
							<div className="form-control">
								<label htmlFor="comments">Comments</label>
								<Field as="textarea" id="comments" name="comments"/>
								<ErrorMessage component={TextError} name="comments" />
							</div>
			
							<div className="form-control">
								<label htmlFor="address">Address</label>
								<FastField type="text" id="address" name="address"/>
								<ErrorMessage component={TextError} name="address" />
							</div>
			
							<div className="form-control">
								<label htmlFor="facebook">facebook</label>
								<Field type="text" id="facebook" name="social.facebook"/>
								<ErrorMessage component={TextError} name="social.facebook" />
							</div>
			
							<div className="form-control">
								<label htmlFor="twitter">twitter</label>
								<Field type="text" id="twitter" name="social.twitter"/>
								<ErrorMessage component={TextError} name="social.twitter" />
							</div>
			
							<div className="form-control">
								<label htmlFor="github">github</label>
								<Field type="text" id="github" name="social.github"/>
								<ErrorMessage component={TextError} name="social.github" />
							</div>
			
							<div className="form-control">
								<label htmlFor="primaryphone">primary phone number</label>
								<Field type="text" id="primaryphone" name="phoneNumbers[0]"/>
								<ErrorMessage component={TextError} name="phoneNumbers[0]" />
							</div>
			
							<div className="form-control">
								<label htmlFor="primaryphone">secondary phone number</label>
								<Field type="text" id="primaryphone" name="phoneNumbers[1]"/>
								<ErrorMessage component={TextError} name="phoneNumbers[1]" />
							</div>
			
							<div className="form-control">
								<label htmlFor="tags">tags</label>
								<FieldArray name="tags">
									{fieldArrayProps => {
										console.log("fieldArrayProps", fieldArrayProps)
										const {push, remove, form} = fieldArrayProps
										const {values} = form
										const {tags} = values
										return (
											<div>
												{tags.map((tag, index) => (
													<div key = {index}>
														<Field type="text" name={`tags[${index}]`}/>
														{index > 0 && (
															<button type="button" onClick={() => remove(index)}>
																-
															</button>
														)}
													</div>
													
												))}
												<button type="button" onClick={() => push("")}>
													+
												</button>
											</div>
										)
									}}
								</FieldArray>
							</div>
			
							<br/>
							<button type="button" onClick={() => formik.validateField("comments")}>Validate comment</button>
							<button type="button" onClick={() => formik.validateForm()}>validate all</button>
							<button type="button" onClick={() => formik.setFieldTouched("comments")}>visit comment</button>
							<button type="button" onClick={() => setFormValues(savedData)}>load saved data</button>
							<button type="reset">reset</button>
							<button type="button" onClick={() => formik.setTouched({
								name: true,
								email: true,
								channel: true,
								comments: true,
								address: true
							})}>visit all</button>
							<button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
						</Form>
					)
				}
			}

		</Formik>
	)
}

export default Youtubeform
