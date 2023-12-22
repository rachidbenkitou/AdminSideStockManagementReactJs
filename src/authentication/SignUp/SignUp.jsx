import React from "react";
import "../auth.css";
export default function SignUp() {
  return (
    <>
      <div className="login-container">
        <div id="main-wrapper" class="container">
          <div class="row justify-content-center ">
            <div class="col-xl-10">
              <div class="card border-0 login-main">
                <div class="card-body p-0">
                  <div class="row no-gutters">
                    <div class="col-lg-6">
                      <div class="p-5">
                        <div class="mb-5">
                          <h3 class="h4 font-weight-bold text-theme">Register</h3>
                        </div>
                        <form>
                        <div class="form-group">
                            <label for="exampleInputName1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputEmail1"
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputName1">
                              Address
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="exampleInputEmail1"
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputName1">
                              Phone
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="exampleInputEmail1"
                            />
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail1">
                              Email address
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="exampleInputEmail1"
                            />
                          </div>
                          <div class="form-group mb-5">
                            <label for="exampleInputPassword1">Password</label>
                            <input
                              type="password"
                              class="form-control"
                              id="exampleInputPassword1"
                            />
                          </div>
                          <button type="submit" class="btn btn-theme">
                            Register
                          </button>
                        </form>
                      </div>
                    </div>
                    <div class="col-lg-6 d-none d-lg-inline-block">
                      <div class="account-block rounded-right">
                        <div class="overlay rounded-right"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p class="text-muted text-center mt-3 mb-0">
                You have an account?
                <a href="" class="text-primary ml-1">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
