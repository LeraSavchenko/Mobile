package com.tns.gen.com.mikepenz.materialdrawer;

public class Drawer_OnDrawerItemClickListener implements com.mikepenz.materialdrawer.Drawer.OnDrawerItemClickListener {
	public Drawer_OnDrawerItemClickListener() {
		com.tns.Runtime.initInstance(this);
	}

	public boolean onItemClick(android.view.View param_0, int param_1, com.mikepenz.materialdrawer.model.interfaces.IDrawerItem param_2)  {
		java.lang.Object[] args = new java.lang.Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onItemClick", boolean.class, args);
	}

}
