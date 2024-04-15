export default function CustomerForm({
    customerFormData,
    handleChange,
    showSSN,
    toggleSSNVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility
}) {
    return (
        <div>
            <div>
                <label>First Name</label>
                <input
                type="text"
                name="firstName"
                value={customerFormData.firstName}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Last Name</label>
                <input
                type="text"
                name="lastName"
                value={customerFormData.lastName}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Gender</label>
                <select
                name="gender"
                value={customerFormData.gender}
                onChange={handleChange}
                required
                >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                </select>
            </div>
            <div>
                <label>Date of Birth</label>
                <input
                type="date"
                name="dateOfBirth"
                value={customerFormData.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
                />
            </div>
            <div>
                <label>SSN (Social Security Number)</label>
                <div className="input-group">
                <input
                    type={showSSN ? "text" : "password"}
                    name="ssn"
                    value={customerFormData.ssn}
                    onChange={handleChange}
                    minLength="9"
                    maxLength="9"
                    required
                />
                <button
                    type="button"
                    onClick={toggleSSNVisibility}
                    className="toggle-visibility"
                >
                    {showSSN ? "Hide" : "Show"}
                </button>
                </div>
            </div>
            <div>
                <label>Phone Number</label>
                <input
                type="tel"
                name="phoneNumber"
                value={customerFormData.phoneNumber}
                minLength="10"
                maxLength="10"
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Address</label>
                <input
                type="text"
                name="address"
                value={customerFormData.address}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                type="email"
                name="email"
                value={customerFormData.email}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Username</label>
                <input
                type="text"
                name="username"
                value={customerFormData.username}
                onChange={handleChange}
                required
                minLength="6"
                />
            </div>
            <div>
                <label>Password</label>
                <input
                type="password"
                name="password"
                value={customerFormData.password}
                onChange={handleChange}
                minLength="12"
                required
                />
            </div>
            <div>
                <label>Confirm Password</label>
                <div className="input-group">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={customerFormData.confirmPassword}
                    onChange={handleChange}
                    minLength="12"
                    required
                />
                <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="toggle-visibility"
                >
                    {showConfirmPassword ? "Hide" : "Show"}
                </button>
                </div>
            </div>
        </div>
    );
};