export default function CustomerForm({
    merchantFormData,
    handleChange,
    showSSN,
    toggleSSNVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility
}) {
    return (
        <div>
            <div>
                <label>Owner Name</label>
                <input
                    type="text"
                    name="ownerName"
                    value={merchantFormData.ownerName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Owner Gender</label>
                <select
                    name="ownerGender"
                    value={merchantFormData.ownerGender}
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
                <label>Owner DOB</label>
                <input
                    type="date"
                    name="ownerDob"
                    value={merchantFormData.ownerDob}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    required
                />
            </div>
            <div>
                <label>Owner SSN</label>
                <div className="input-group">
                <input
                    type={showSSN ? "text" : "password"}
                    name="ownerSsn"
                    value={merchantFormData.ownerSsn}
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
                <label>Owner Phone</label>
                <input
                    type="tel"
                    name="ownerPhone"
                    value={merchantFormData.ownerPhone}
                    onChange={handleChange}
                    minLength="10"
                    maxLength="10"
                    required
                />
            </div>
            <div>
                <label>Business Name</label>
                <input
                    type="text"
                    name="businessName"
                    value={merchantFormData.businessName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Business DOI</label>
                <input
                    type="date"
                    name="businessDoi"
                    value={merchantFormData.businessDoi}
                    onChange={handleChange}
                    max={new Date().toISOString().split("T")[0]}
                    required
                />
            </div>
            <div>
                <label>Business Address</label>
                <input
                    type="text"
                    name="address"
                    value={merchantFormData.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Business EIN</label>
                <div className="input-group">
                <input
                    type={showSSN ? "text" : "password"}
                    name="ein"
                    value={merchantFormData.ein}
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
                <label>Business Phone</label>
                <input
                    type="tel"
                    name="businessPhone"
                    value={merchantFormData.businessPhone}
                    onChange={handleChange}
                    minLength="10"
                    maxLength="10"
                    required
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={merchantFormData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={merchantFormData.username}
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
                    value={merchantFormData.password}
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
                    value={merchantFormData.confirmPassword}
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