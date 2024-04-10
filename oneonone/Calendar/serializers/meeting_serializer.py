from rest_framework import serializers
from ..models.meeting import Meeting
from ..models.meetingAvailability import MeetingAvailability
from .meeting_availability_serializer import \
    MeetingAvailabilityCreateSerializer, MeetingAvailabilityViewSerializer, \
    MeetingAvailabilityUpdateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class MeetingCreateSerializer(serializers.ModelSerializer):
    availability_meeting = MeetingAvailabilityCreateSerializer(many=True,
                                                               required=False)

    class Meta:
        model = Meeting
        fields = ["receiver_email", "receiver", "availability_meeting"]
        extra_kwargs = {
            "receiver_email": {"required": True},
        }

    def create(self, validated_data):
        availability_meeting_data = validated_data.pop("availability_meeting",
                                                       [])
        meeting = Meeting.objects.create(**validated_data)
        for availability_data in availability_meeting_data:
            MeetingAvailability.objects.create(meeting=meeting,
                                               **availability_data)
        return meeting


class MeetingUpdateSerializer(serializers.ModelSerializer):
    availability_meeting = MeetingAvailabilityUpdateSerializer(many=True,
                                                               required=False)

    class Meta:
        model = Meeting
        fields = ["id", "receiver_email", "receiver", "start_time", "status",
                  "availability_meeting"]
        extra_kwargs = {
            "id": {"read_only": True},
            "status": {"read_only": True},
            "receiver": {"read_only": True}
        }

    def update(self, instance, validated_data):
        start_time = validated_data.get('start_time')
        if start_time is not None:
            validated_data['status'] = True

        availabilities_data = validated_data.pop('availability_meeting', [])
        instance = super().update(instance, validated_data)

        current_availability_ids = set(
            instance.availability_meeting.values_list('id', flat=True))
        updated_availability_ids = set()
        print(current_availability_ids)

        for availability_data in availabilities_data:
            availability_id = availability_data.get('id', None)
            # if 'id' in the current database update it:
            if availability_id in current_availability_ids:
                avail_instance = MeetingAvailability.objects.get(id=availability_id)
                for key, value in availability_data.items():
                    setattr(avail_instance, key, value)
                avail_instance.save()
                updated_availability_ids.add(availability_id)
            # if id does not exists (we should give new availability id value of or None but it might raise is_valid error -1)
            else:
                availability_data['id'] = None
                new_availability = MeetingAvailability.objects.create(
                    meeting=instance, **availability_data)
                updated_availability_ids.add(new_availability.id)
        availabilities_to_delete = current_availability_ids - updated_availability_ids
        # after updating any changes remove deleted fields
        if availabilities_to_delete:
            MeetingAvailability.objects.filter(
                id__in=availabilities_to_delete).delete()

        return instance


class MeetingCalendarViewSerializer(serializers.ModelSerializer):
    from .calendar_serializer import CalendarViewSerializer
    availability_meeting = MeetingAvailabilityViewSerializer(many=True,
                                                             read_only=True)
    calendar = CalendarViewSerializer(read_only=True)
    class Meta:
        model = Meeting
        fields = ["id", "receiver_email", "receiver", "start_time", "status",
                  "availability_meeting", "calendar"]
        extra_kwargs = {'id': {'read_only': True}}


class MeetingViewSerializer(serializers.ModelSerializer):
    #availability_meeting = MeetingAvailabilityViewSerializer(many=True, read_only=True)
    class Meta:
        model = Meeting
        fields = ["id", "receiver_email", "receiver", "start_time", "status"]
        extra_kwargs = {'id': {'read_only': True}}
