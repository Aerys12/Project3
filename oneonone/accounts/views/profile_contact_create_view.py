from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from django.db.models import Q
from accounts.serializers.contact_serializer import ContactSerializer  
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from accounts.models import Contact


class ContactCreateView(APIView):
    """
    API view for creating a new contact.

    This view handles the POST request to create a new contact using the ContactSerializer.
    If the serializer is valid, the contact is saved and a response with the serialized data
    and status code 201 (Created) is returned. If the serializer is not valid, a response
    with the serializer errors and status code 400 (Bad Request) is returned.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            contact_user = User.objects.get(username=request.data.get('username'))
            if request.user == contact_user:
                return Response({'error': 'You cannot add yourself.'}, status=status.HTTP_400_BAD_REQUEST)

            contact, created = Contact.objects.get_or_create(owner=request.user, contact=contact_user)
            if created:
                serializer = ContactSerializer(contact)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Contact already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        

class UserEmailSearchView(APIView):
    """
    API view for searching users by email.

    This view handles the GET request to search for users based on the provided email query parameter.
    If the email query parameter is provided, it searches for users whose email contains the query
    (case-insensitive) and excludes the current user. It returns a response with the list of matching users
    and status code 200 (OK). If no email query parameter is provided, it returns a response with
    a message indicating that no email was provided and status code 400 (Bad Request).
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        email_query = request.query_params.get('email', '').strip()
        if email_query:
            users = User.objects.filter(email__icontains=email_query).exclude(id=request.user.id)
            results = [{'id': user.id, 'username': user.username, 'name': user.get_full_name(), 'email': user.email} for user in users]
            return Response(results, status=200)
        return Response({"message": "No email provided"}, status=400)
