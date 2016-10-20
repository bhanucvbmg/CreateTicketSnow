//SERVER SCRIPT
(function($sp, input, data, options) {
	"use strict";
	data.is_logged_in = gs.getSession().isLoggedIn();
	data.sys_id = '-1';
		  //var recordType='incident',choiceField='category';
	 
		data.ci={};
		data.impact={};
		data.urgency={};
		data.contactpref={};
		
	  data.ci.act=[];
		data.ci.dis=[];
	  data.impact.act=[];
	  data.impact.dis=[];
	  data.urgency.act=[];
	  data.urgency.dis=[];
	  data.contactpref.dis=[];
	  data.contactpref.act=[];
	
    function createObject(obj,recordType,choiceField){  
		var gr1 = new GlideRecord(recordType);  
		gr1.newRecord();
		var choiceList = j2js(gr1.getElement(choiceField).getChoices());  
		var cl = new ChoiceList(recordType, choiceField);  
		for (var i=0; i < choiceList.length; i++ ) {  
			obj.act.push(choiceList[i]);
			obj.dis.push(cl.getLabel(choiceList[i]));
		}
		data.first=obj[0];
		//data.ci=ci;
	 }	

	  createObject(data.ci,'incident','category');
	  createObject(data.impact,'incident','impact');
	  createObject(data.urgency,'incident','urgency');
	  createObject(data.contactpref,'incident','contact_type');
	  	
	
	if (input && input.action == 'register' && input.category && input.impact && input.urgency && input.contact_type) {
		var result = {};
		var gr = new GlideRecord('incident');
		gr.initialize();
		gr.setValue('category', input.category);
		gr.setValue('impact', input.impact);
		gr.setValue('urgency', input.urgency);
		gr.setValue('contact_type', input.contact_type);
		gr.setValue('short_description', input.short_description);
		
		var sys_id = gr.insert();
		if (!gs.nil(sys_id)) {
			data.sys_id = sys_id;
			data.status = "success";
			data.message = gs.addInfoMessage("Your Incident Has been Submitted.");
		} else {
			data.status = "error";
			data.message = gs.addInfoMessage("Incident Submission Failed.")
		}
		data.result = result;
		return data;
	}
})($sp, input, data, options);
