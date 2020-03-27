<template>
  <div class="profile-container">
        <h2>Edit Project</h2>
        <div class="form-group">
	        <label for="inputPassword">New Password:</label>
	        <input
	            type="password" class="form-control" v-model="password"
	            name="password" id="inputPassword" 
	            placeholder="Insert new password" required min="3"
				title="New password must be 3 characters and diferent from old."/>
	    </div>
	    <div class="form-group">
	        <label for="inputNewPasswordC">Password Confirmation:</label>
	        <input
	            type="password" class="form-control" v-model="passwordConfirmation"
	            name="newPasswordC" id="inputNewPasswordC"
	            placeholder="Confirm new password" required min="3"/>
	    </div>
	    <div class="form-group">
	        <label for="inputOld">Old Password:</label>
	        <input
	            type="password" class="form-control" v-model="oldPassword"
	            name="old" id="inputOld"
	            placeholder="Insert old password" required min="3"/>
	    </div>










        </div>
</template>