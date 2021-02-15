import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';

const CreateHook = (props) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const id = props.match.params.id;

    useEffect(() => {
        if (id == -1) {
            return;
        }
        CustomerService.getCustomerById(id).then((res) => {
            let cust = res.data;
            setName(cust.name);
            setAddress(cust.address);
            setEmail(cust.email);
        })
    }, [])


    const changeNameHandler = (event) => {
        setName(event.target.value);
    }

    const changeAddressHandler = (event) => {
        setAddress(event.target.value);
    }

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const saveCustomer = (event) => {
        event.preventDefault();
        let cust = { name: name, address: address, email: email };
        if (id < 0) {
            CustomerService.createCustomer(cust).then(res => {
                props.history.push('/customers');
            })
        } else {
            CustomerService.updateCustomer(cust, id).then(res => {
                props.history.push('/customers');
            })
        }
    }

    const cancel = () => {
        props.history.push('/customers');
    }

    const pageTitle = () => {
        if (id < 0) {
            return "Add Customer";
        } else {
            return "Update Customer";
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3">
                    <h3 class="text-center"> {pageTitle()}</h3>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label> Name</label>
                                <input name="name" placeholder=" Customers Name" className="form-control"
                                    value={name} onChange={changeNameHandler} />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input name="address" placeholder="Address" className="form-control"
                                    value={address} onChange={changeAddressHandler} />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" placeholder="Email" className="form-control"
                                    value={email} onChange={changeEmailHandler} />
                            </div>
                            <button className="btn btn-success" onClick={saveCustomer}>Save</button>
                            <button className="btn btn-success" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateHook