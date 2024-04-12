from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    owner = models.ForeignKey(User, related_name='contacts', on_delete=models.CASCADE)
    contact = models.ForeignKey(User, related_name='added_as_contact', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('owner', 'contact')

    def __str__(self):
        return f"{self.contact.get_full_name()}"

    def get_contact_email(self):
        if self.contact:
            return self.contact.email
        else:
            return "No contact"
