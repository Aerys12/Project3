from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import Contact

class ContactSerializer(serializers.ModelSerializer):
    contact_username = serializers.CharField(source='contact.username', read_only=True)
    contact_full_name = serializers.SerializerMethodField() 
    contact_email = serializers.CharField(source='contact.email', read_only=True) 

    class Meta:
        model = Contact
        fields = ['id', 'owner', 'contact', 'contact_username', 'contact_email', 'contact_full_name', 'created_at', 'updated_at']
    
    def get_contact_full_name(self, obj):
        return obj.contact.get_full_name() if obj.contact else "No contact name"
