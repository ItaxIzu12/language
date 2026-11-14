from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [("learning", "0002_course_word"), ("catalog", "0001_adopt_catalog")]
    operations = [migrations.SeparateDatabaseAndState(state_operations=[
        migrations.DeleteModel("Word"), migrations.DeleteModel("Course"),
    ])]
